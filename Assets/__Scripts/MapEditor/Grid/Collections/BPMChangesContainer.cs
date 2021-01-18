using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using UnityEngine;
using Zenject;

public class BPMChangesContainer : BeatmapObjectContainerCollection
{

    public float lastBPM;
    public int lastCheckedBPMIndex = 0;

    private IEnumerable<Renderer> allGridRenderers;
    [SerializeField] private Transform gridRendererParent;
    [SerializeField] private GameObject bpmPrefab;

    // This is a shader-level restriction and nothing I can fix.
    public static readonly int ShaderArrayMaxSize = 1023;

    private static readonly int Times = Shader.PropertyToID("_BPMChange_Times");
    private static readonly int BPMs = Shader.PropertyToID("_BPMChange_BPMs");
    private static readonly int BPMCount = Shader.PropertyToID("_BPMChange_Count");

    public override BeatmapObject.Type ContainerType => BeatmapObject.Type.BPM_CHANGE;

    private MeasureLinesController measureLinesController;
    private BeatSaberSong song;
    private BeatSaberSong.DifficultyBeatmap diff;

    [Inject]
    private void Construct(MeasureLinesController measureLinesController, BeatSaberSong song, BeatSaberSong.DifficultyBeatmap diff)
    {
        this.measureLinesController = measureLinesController;
        this.song = song;
        this.diff = diff;
    }

    private IEnumerator Start()
    {
        allGridRenderers = gridRendererParent.GetComponentsInChildren<Renderer>().Where(x => x.material.shader.name == "Grid ZDir");
        lastBPM = song.beatsPerMinute;

        if (diff.customData == null) yield break;

        yield return new WaitUntil(() => !SceneTransitionManager.IsLoading);

        // TODO: Localize the big chunk of text
        if (diff.customData.HasKey("_editorOffset") && diff.customData["_editorOffset"] > 0f)
        {
            if (Settings.Reminder_UnsupportedEditorOffset)
            {
                PersistentUI.ShowDialogBox("ChroMapper has detected editor offset originating from MediocreMap Assistant 2.\n" +
                    "This is unsupported by ChroMapper. It is recommended to set up your audio to eliminate the need for any offset.\n" +
                    "However, ChroMapper can replace this offset with a BPM Change to keep the grid aligned.\n\n" +
                    "Would you like ChroMapper to do this?", CreateAutogeneratedBPMChange, "Yes", "Do This Automatically", "No");
            }
            else
            {
                CreateAutogeneratedBPMChange(1);
            }
        }
    }

    private void CreateAutogeneratedBPMChange(int res)
    {
        if (res == 2) return;
        Settings.Reminder_UnsupportedEditorOffset = res == 0;

        float offset = diff.customData["_editorOffset"];

        diff.customData.Remove("_editorOffset");
        diff.customData.Remove("_editorOldOffset");

        var autoGenerated = new BeatmapBPMChange(
            BeatSaberSongContainer.Instance.song.beatsPerMinute,
            AudioTimeSyncController.GetBeatFromSeconds(offset / 1000f));

        autoGenerated._customData = new SimpleJSON.JSONObject();
        autoGenerated._customData.Add("__note", "Autogenerated by ChroMapper");

        SpawnObject(autoGenerated, true, false);
        RefreshGridShaders();
        RefreshPool(true);
    }

    internal override void SubscribeToCallbacks()
    {
        EditorScaleController.EditorScaleChangedEvent += EditorScaleChanged;
        LoadInitialMap.LevelLoadedEvent += RefreshGridShaders;
    }

    private void EditorScaleChanged(float obj)
    {
        foreach (Renderer renderer in allGridRenderers)
        {
            renderer.material.SetFloat("_EditorScale", EditorScaleController.EditorScale);
        }
    }

    internal override void UnsubscribeToCallbacks()
    {
        EditorScaleController.EditorScaleChangedEvent -= EditorScaleChanged;
        LoadInitialMap.LevelLoadedEvent -= RefreshGridShaders;
    }

    protected override void OnObjectDelete(BeatmapObject obj)
    {
        RefreshGridShaders();
    }

    public void RefreshGridShaders()
    {
        float[] bpmChangeTimes = new float[ShaderArrayMaxSize];
        float[] bpmChangeBPMS = new float[ShaderArrayMaxSize];
        bpmChangeTimes[0] = 0;
        bpmChangeBPMS[0] = song.beatsPerMinute;
        
        for (int i = 0; i < LoadedObjects.Count; i++)
        {
            if (i >= ShaderArrayMaxSize - 1)
            {
                Debug.LogError($":hyperPepega: :mega: THE CAP FOR BPM CHANGES IS {ShaderArrayMaxSize - 1}, WHY TF DO YOU HAVE THIS MANY BPM CHANGES!?!?");
                break;
            }

            var bpmChange = LoadedObjects.ElementAt(i) as BeatmapBPMChange;
            bpmChangeTimes[i + 1] = bpmChange._time;
            bpmChangeBPMS[i + 1] = bpmChange._BPM;


            if (i == 0)
            {
                bpmChange._Beat = Mathf.CeilToInt(bpmChange._time);
            }
            else
            {
                var songBPM = song.beatsPerMinute;
                var lastChange = LoadedObjects.ElementAt(i - 1) as BeatmapBPMChange;
                var passedBeats = (bpmChange._time - lastChange._time - 0.01f) / songBPM * lastChange._BPM;
                bpmChange._Beat = lastChange._Beat + Mathf.CeilToInt(passedBeats);
            }
        }

        foreach (Renderer renderer in allGridRenderers)
        {
            renderer.material.SetFloatArray(Times, bpmChangeTimes);
            renderer.material.SetFloatArray(BPMs, bpmChangeBPMS);
            renderer.material.SetInt(BPMCount, LoadedObjects.Count + 1);
        }

        measureLinesController.RefreshMeasureLines();
    }

    public float FindRoundedBPMTime(float beatTimeInSongBPM, float snap = -1)
    {
        if (snap == -1)
        {
            snap = 1f / AudioTimeSyncController.gridMeasureSnapping;
        }
        var lastBPM = FindLastBPM(beatTimeInSongBPM);
        
        // If its null, return rounded song bpm
        if (lastBPM is null) return (float)Math.Round(beatTimeInSongBPM / snap, MidpointRounding.AwayFromZero) * snap; 

        var difference = beatTimeInSongBPM - lastBPM._time;
        var differenceInBPMBeat = difference / song.beatsPerMinute * lastBPM._BPM;
        var roundedDifference = (float)Math.Round(differenceInBPMBeat / snap, MidpointRounding.AwayFromZero) * snap;
        var roundedDifferenceInSongBPM = roundedDifference / lastBPM._BPM * song.beatsPerMinute;

        return roundedDifferenceInSongBPM + lastBPM._time;
    }

    /// <summary>
    /// Find the last <see cref="BeatmapBPMChange"/> before a given beat time.
    /// </summary>
    /// <param name="beatTimeInSongBPM">Time in raw beats (Unmodified by any BPM Changes)</param>
    /// <param name="inclusive">Whether or not to include <see cref="BeatmapBPMChange"/>s with the same time value.</param>
    /// <returns>The last <see cref="BeatmapBPMChange"/> before the given beat (or <see cref="null"/> if there is none).</returns>
    public BeatmapBPMChange FindLastBPM(float beatTimeInSongBPM, bool inclusive = true)
    {
        if (inclusive) return UnsortedObjects.Where(x => x._time <= beatTimeInSongBPM + 0.01f).LastOrDefault() as BeatmapBPMChange;
        return UnsortedObjects.Where(x => x._time + 0.01f < beatTimeInSongBPM).LastOrDefault() as BeatmapBPMChange;
    }

    public override BeatmapObjectContainer CreateContainer() => BeatmapBPMChangeContainer.SpawnBPMChange(null, ref bpmPrefab);

    protected override void UpdateContainerData(BeatmapObjectContainer con, BeatmapObject obj)
    {
        BeatmapBPMChangeContainer container = con as BeatmapBPMChangeContainer;
        container.UpdateBPMText();
    }
}
