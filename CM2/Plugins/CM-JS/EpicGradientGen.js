function epicGradients(cursor, notes, events, walls, _, global, data) {
    selectedEvents = [];

    for(let i = 0; i < events.length; i++) {
        if(events[i].selected) {
            selectedEvents.push(events[i])
        };
    };
    if(selectedEvents.length !== 2) {
        alert('Select exactly 2 events!');
        return;
    } else if(selectedEvents[0]._type !== selectedEvents[1]._type) {
            alert('Make sure your events are the same type!');
            return;
        }
    var step = 1 / global.params[0];
    //I spent like 6 hours trying to figure out why this script didn't work and it was because I capitalized these
    var easingR = global.params[1];
    var easingG = global.params[2];
    var easingB = global.params[3];
    var easingA = global.params[4];
    //this language is pain
    var startR = selectedEvents[0]._customData._color[0];
    var startG = selectedEvents[0]._customData._color[1];
    var startB = selectedEvents[0]._customData._color[2];
    var startA = selectedEvents[0]._customData._color[3];
    var endR = selectedEvents[1]._customData._color[0];
    var endG = selectedEvents[1]._customData._color[1];
    var endB = selectedEvents[1]._customData._color[2];
    var endA = selectedEvents[1]._customData._color[3];
    var changeR = endR - startR;
    var changeG = endG - startG;
    var changeB = endB - startB;
    var changeA = endA - startA;
    var startTime = selectedEvents[0]._time;
    var endTime = selectedEvents[1]._time;
    var duration = endTime - startTime;

    //Do I have to keep this in?
    /* ============================================================
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Open source under the BSD License.
 *
 * Copyright © 2008 George McGinley Smith
 * All rights reserved.
 * https://raw.github.com/danro/jquery-easing/master/LICENSE
 * ======================================================== */
const easing = {
	// t: current time, b: begInnIng value, c: change In value, d: duration
    Linear: function(t, b, c, d) {
        return c * t / d + b;
    },
	InQuad: function (t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	OutQuad: function (t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	InOutQuad: function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	InCubic: function (t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	OutCubic: function (t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	InOutCubic: function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	InQuart: function (t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	OutQuart: function (t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	InOutQuart: function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	InQuint: function (t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	OutQuint: function (t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	InOutQuint: function (t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	InSine: function (t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	OutSine: function (t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	InOutSine: function (t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	InExpo: function (t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	OutExpo: function (t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	InOutExpo: function (t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	InCirc: function (t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	OutCirc: function (t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	InOutCirc: function (t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	InElastic: function (t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	OutElastic: function (t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*0.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	InOutElastic: function (t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(0.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	InBack: function (t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	OutBack: function (t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	InOutBack: function (t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	InBounce: function (t, b, c, d) {
		return c - easing.OutBounce ( d-t, 0, c, d) + b;
	},
	OutBounce: function (t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
		}
	},
	InOutBounce: function (t, b, c, d) {
		if (t < d/2) return easing.InBounce ( t*2, 0, c, d) * .5 + b;
		return easing.OutBounce ( t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
    
/*===============================================
 *
 * TERMS OF USE - EASING EQUATIONS
 * 
 * Open source under the BSD License. 
 * 
 * Copyright © 2001 Robert Penner
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without modification, 
 * are permitted provided that the following conditions are met:
 * 
 * Redistributions of source code must retain the above copyright notice, this list of 
 * conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright notice, this list 
 * of conditions and the following disclaimer in the documentation and/or other materials 
 * provided with the distribution.
 * 
 * Neither the name of the author nor the names of contributors may be used to endorse 
 * or promote products derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY 
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED 
 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED 
 * OF THE POSSIBILITY OF SUCH DAMAGE. 
 ==================================================*/
};
var timer = startTime;
while(timer < endTime) {
    let red = easing[easingR](timer,startR,changeR,duration);
    let green = easing[easingG](timer,startG,changeG,duration);
    let blue = easing[easingB](timer,startB,changeB,duration);
    let alpha = easing[easingA](timer,startA,changeA,duration);
    timer += step;
    events.push(
        {
            "_time" : timer,
            "_type" : selectedEvents[0]._type,
            "_value" : 1,
            "_customData": {
                "_color" : [
                    red,
                    green,
                    blue,
                    alpha
                ]
            }
        }
    )
 }
};

module.exports = {
    name: "Precision Gradients",
    errorCheck: false,
    params:{
    'Precision: 1/': 1,
    'Red Easing' : [
        'Linear',
        'InQuad',
        'OutQuad',
        'InOutQuad',
        'InCubic',
        'OutCubic',
        'InOutCubic',
        'InQuartic',
        'OutQuartic',
        'InOutQuartic',
        'InQuint',
        'OutQuint',
        'InOutQuint',
        'InSine',
        'OutSine',
        'InOutSine',
        'InExpo',
        'OutExpo',
        'InOutExpo',
        'InCirc',
        'OutCirc',
        'InOutCirc',
        'InElastic',
        'OutElastic',
        'InOutElastic',
        'InBack',
        'OutBack',
        'InOutBack',
        'InBounce',
        'OutBounce',
        'InOutBounce',
    ],
    'Green Easing' : [
        'Linear',
        'InQuad',
        'OutQuad',
        'InOutQuad',
        'InCubic',
        'OutCubic',
        'InOutCubic',
        'InQuartic',
        'OutQuartic',
        'InOutQuartic',
        'InQuint',
        'OutQuint',
        'InOutQuint',
        'InSine',
        'OutSine',
        'InOutSine',
        'InExpo',
        'OutExpo',
        'InOutExpo',
        'InCirc',
        'OutCirc',
        'InOutCirc',
        'InElastic',
        'OutElastic',
        'InOutElastic',
        'InBack',
        'OutBack',
        'InOutBack',
        'InBounce',
        'OutBounce',
        'InOutBounce',
    ],
    'Blue Easing' : [
        'Linear',
        'InQuad',
        'OutQuad',
        'InOutQuad',
        'InCubic',
        'OutCubic',
        'InOutCubic',
        'InQuartic',
        'OutQuartic',
        'InOutQuartic',
        'InQuint',
        'OutQuint',
        'InOutQuint',
        'InSine',
        'OutSine',
        'InOutSine',
        'InExpo',
        'OutExpo',
        'InOutExpo',
        'InCirc',
        'OutCirc',
        'InOutCirc',
        'InElastic',
        'OutElastic',
        'InOutElastic',
        'InBack',
        'OutBack',
        'InOutBack',
        'InBounce',
        'OutBounce',
        'InOutBounce',
    ],
    'Alpha Easing' : [
        'Linear',
        'InQuad',
        'OutQuad',
        'InOutQuad',
        'InCubic',
        'OutCubic',
        'InOutCubic',
        'InQuartic',
        'OutQuartic',
        'InOutQuartic',
        'InQuint',
        'OutQuint',
        'InOutQuint',
        'InSine',
        'OutSine',
        'InOutSine',
        'InExpo',
        'OutExpo',
        'InOutExpo',
        'InCirc',
        'OutCirc',
        'InOutCirc',
        'InElastic',
        'OutElastic',
        'InOutElastic',
        'InBack',
        'OutBack',
        'InOutBack',
        'InBounce',
        'OutBounce',
        'InOutBounce',
    ]
},
    run: epicGradients
}