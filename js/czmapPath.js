﻿
var china = [];

function paintMap(R) {
    var attr = {
        // "fill": "#97d6f5",
        "fill": "#2DFC81",
        "stroke": "#fff",
        "stroke-width": 1,
        "stroke-linejoin": "round"
    };

    china.nm = {
        name: "宁明县",
        color:'#fced52',
        id:"cz_nm",//用于get传参用
        data:regionJsonObj.cz_nm,//未结案件数
        path: R.path("m 319,422 c 8.303,-4.646 2.942,5.527 4,9 2.052,6.738 16.378,7.05 20,1 0.819,-1.368 -0.279,-8.035 1,-9 3.43,-2.588 5.809,1.188 11,3 1.908,0.666 4.994,-0.875 6,0 -0.008,-0.007 1.772,6.63 2,7 2.628,4.28 9.548,6.962 10,9 0.918,4.14 -7.911,9.59 -2,14 5.525,4.122 -2.257,9.719 -8,16 -7.868,8.605 -15.548,16.172 -22,28 -2.168,3.974 -6.502,13.464 -6,19 0.385,4.249 5.832,8.66 6,13 0.156,4.055 -3.869,5.577 -4,10 -0.097,3.264 4.174,6.89 4,11 -0.146,3.467 -4.964,6.127 -5,9 -0.053,4.173 3.811,4.23 3,7 -2.637,9.004 -12.876,4.445 -17,14 -3.214,7.447 6.024,7.254 -2,12 -2.438,1.442 -6.906,-1.381 -10,-1 -11.001,1.354 -15.155,20.069 -24,20 -11.732,-0.092 -3.401,-13.161 -5,-23 -1.087,-6.691 -20.469,-31.399 -31,-17 -1.21,1.654 -0.622,5.302 -3,6 -10.66,3.13 -13.953,-13.042 -19,-17 -4.72,-3.701 -15.103,-3.748 -20,-7 -3.678,-2.442 -5.745,-10.393 -9,-12 -4.836,-2.388 -21.588,0.249 -24,-6 -3.559,-9.22 17.757,-15.854 18,-23 0.208,-6.099 -10.228,-17.201 -21,-15 -4.841,0.989 -10.049,15.425 -18,8 -1.588,-1.483 -0.474,-5.265 -1,-9 -1.467,-10.423 -1.019,-7.958 7,-12 3.161,-1.593 5.79,-1.597 7,-5 1.685,-4.737 -3.08,-8.659 -2,-12 0.945,-2.922 6.617,-1.817 8,-6 1.795,-5.43 -3.033,-15.659 -6,-17 -0.493,-0.223 -6.634,-0.506 -7,-1 -7.566,-10.223 7.179,-19.299 8,-22 1.65,-5.428 -3.458,-9.565 -3,-13 0.398,-2.983 4.764,-9.536 8,-11 0.917,-0.415 4.615,1.074 6,1 4.007,-0.215 15.373,-4.19 17,-8 4.288,-10.038 -10.069,-30.598 14,-28 0.178,0.02 11.623,1.586 11,1 2.642,2.487 -1.117,12.733 4,14 8.767,2.17 0.383,-8.038 5,-12 0.006,-0.005 7.359,6.997 3,5 4.821,2.208 4.126,-5.809 9,-4 2.813,1.044 -0.294,6.282 4,8 6.243,2.497 7.819,-5.555 11,-1 2.761,3.953 -3.544,4.319 -6,11 -0.65,1.769 0.632,4.638 0,6 -0.875,1.888 -4.625,3.548 -5,5 0.015,-0.059 0.71,13.23 0,12 2.601,4.506 4.337,0.823 8,2 1.266,0.406 3.067,4.068 6,5 3.711,1.18 7.429,-1.04 9,0 2.333,1.545 2.126,8.651 6,10 9.247,3.22 14.426,-6.359 30,-5 4.667,0 9.333,0 14,0 z").attr(attr)
    }
    china.px = {
        name: "凭祥市",
        color:'#ed643a',
        id:"cz_px",
        data:regionJsonObj.cz_px,
        path: R.path("m 81,491 c -7.359,-9.56 5.415,-10.273 6,-18 0.327,-4.32 -4.43,-8.376 -4,-10 -0.076,0.288 4.061,-2.063 4,-2 8.018,-8.124 -5.526,-14.097 -6,-19 -0.44,-4.556 4.726,-7.993 4,-11 -1.51,-6.258 -12.549,-5.345 -9,-12 2.074,-3.889 5.654,2.133 9,-2 4.367,-5.393 -8.474,-25.934 2,-20 7.311,4.142 6.206,11.53 9,19 1.93,5.159 12.675,1.495 15,4 1.72,1.853 -2.458,6.334 -1,10 0.76,1.91 8.498,6.472 12,6 3.297,-0.444 3.245,-5.977 9,-8 3.953,-1.39 10.5,0.669 14,-1 2.543,-1.213 5.639,-9.503 9,-11 2.574,-1.146 10.266,0.318 10,0 5.458,6.531 -5.738,11.067 -7,14 -2.246,5.22 -2.498,14.59 0,18 2.537,3.464 9.542,1.404 11,3 0.718,0.786 2.827,9.556 2,12 -1.098,3.244 -6.974,2.754 -8,6 -0.549,1.736 3.838,9.189 2,13 -1.067,2.212 -14.826,8.031 -19,8 -3.876,-0.029 -8.224,-4.642 -13,-5 -7.045,-0.528 -12.223,4.239 -17,3 -5.943,-1.542 -5.981,-9.746 -13,-11 -12.776,-2.282 -10.431,7.998 -19,14 -0.667,0 -1.333,0 -2,0 z").attr(attr)
    };
    china.fs = {
        name: "扶绥县",
        color:'#6486e8',
        id:"cz_fs",
        data:regionJsonObj.cz_fs,
        path: R.path("m 455,211 c 7.633,2.536 9.158,2.893 10,5 1.438,3.599 -2.743,9.155 -1,12 4.524,7.385 27.386,-2.114 19,8 -2.586,3.119 -0.992,5.384 -3,10 -2.35,5.401 -7.89,7.44 -7,14 0.377,2.782 7.91,12.609 9,13 10.714,3.838 15.044,-6.258 16,-10 2.164,-8.468 1.41,1.102 2,4 0.642,3.155 6.819,10.458 -1,12 -9.971,1.966 -24.676,-1.697 -26,13 -0.74,8.215 6.671,9.679 6,17 -0.282,3.084 -11.721,10.624 -11,14 0.949,4.447 4.027,-0.468 8,2 1.869,1.161 1.135,6.063 3,7 3.74,1.878 7.952,-1.591 12,0 2.828,1.111 -1.253,4.203 2,6 2.315,1.279 5.641,-1.868 6,-1 1.633,3.941 -4.171,4.589 -3,10 2.173,10.035 20.384,5.617 2,15 -1.756,0.896 -1.654,3.276 -3,4 -1.257,0.676 -3.806,-0.766 -5,0 -1.04,0.666 -5.154,6.223 -7,7 -6.979,2.941 -12.884,-1.949 -15,4 0.43,-1.208 1.475,7.29 1,8 -1.547,2.314 -7.919,2.654 -9,4 -1.333,1.66 -0.314,5.779 -1,8 -1.554,5.031 -9.461,16.206 -14,17 1.72,-0.301 -6.744,-4.495 -4,-4 -4.188,-0.756 -3.566,4.033 -11,5 -5.313,0.691 -11.789,-2.515 -14,-2 -3.37,0.784 -4.943,4.837 -7,5 -2.813,0.223 -2.542,-3.529 -6,-4 -6.789,-0.924 -8.176,6.285 -11,7 -2.951,0.747 -3.618,-1.805 -7,-2 -1.752,-0.102 -4.999,1.836 -8,2 -5.087,0.278 -10.304,-2.358 -12,-2 -4.489,0.948 -7.885,8.054 -15,1 -1.262,-1.251 1.326,-3.286 1,-4 -0.864,-1.89 -4.125,-0.576 -7,-5 -1.17,-1.8 -3.255,-11.918 -3,-13 -0.697,2.963 7.142,-8.418 6,-8 0.181,-0.066 14.096,5.808 17,2 4.368,-5.728 -8.364,-9.81 -5,-17 -0.48,1.027 9.769,0.938 5,2 0.602,-0.134 7.827,-18.661 7,-21 -2.146,-6.067 -5,-1.313 -12,-4 -4.449,-1.708 -11.586,-11.328 -17,-15 -6.426,-4.357 -5.294,-0.386 -6,-9 -0.278,-3.396 -3.979,-5.496 -3,-8 0.222,-0.567 4.428,0.431 5,0 1.549,-1.166 0.238,-5.668 4,-9 3.26,-2.887 9.363,0.123 11,-4 0.966,-2.433 -2.843,-3.842 -1,-5 0.433,-0.271 16.983,-3.692 16,-4 3.357,1.051 -1.823,5.724 4,8 5.281,2.064 4.648,-3.348 9,-5 2.755,-1.046 10.351,0.191 10,-5 -0.241,-3.574 -6.765,-1.595 -7,-5 -0.37,-5.347 7.476,-6.434 11,-12 3.54,-5.591 -0.114,-8.183 6,-10 5.164,-1.535 11.394,4.526 14,1 5.811,-7.86 -16.507,-15.245 -19,-19 -0.828,-1.247 0.871,-5.291 0,-8 -1.181,-3.669 -6.849,-4.653 -7,-5 -0.826,-1.887 1.476,-5.18 1,-8 -1.257,-7.456 -5.81,-1.94 -6,-7 -0.249,-6.612 5.508,-4.999 6,-9 0.737,-5.995 -2.724,-5.031 -5,-11 -1.257,-3.295 -0.579,-7.842 -3,-11 -6.297,-8.213 -5.69,-4.433 -11,-10 -8.685,-9.104 11.693,1.163 14,1 5.178,-0.365 2.693,-5.451 8,-5 10.194,0.866 8.967,22.894 23,26 11.626,2.573 13.691,-3.998 21,6 4.019,2.315 12.319,0.347 18,1 z").attr(attr)
    };
    china.jz = {
        name: "江州区",
        color:'#4ad852',
        id:"cz_jz",
        data:regionJsonObj.cz_jz,
        path: R.path("m 366,193 c 3.429,2.694 4.88,13.438 10,15 0.901,0.275 7.996,-1.843 9,-1 8.058,6.767 -3.892,7.985 -4,15 -0.049,3.187 4.937,3.268 6,8 0.491,2.187 -1.643,5.465 -1,7 0.938,2.243 4.606,2.028 7,6 2.102,3.487 -0.775,7.192 2,10 3.854,3.9 8.994,5.733 13,10 9.264,9.868 -9.767,-1.287 -15,8 -1.035,1.837 0.479,5.71 -1,8 -2.16,3.345 -11.405,5 -11,11 0.131,1.943 7.411,6.001 7,7 -1.473,3.58 -3.554,-0.038 -7,1 -8.319,2.505 -6.366,9.962 -9,0 -1.49,-5.638 -4.586,-1.048 -8,0 -3.834,1.177 -12.161,-0.609 -14,1 -2.145,1.876 0.671,6.599 -1,8 -1.198,1.005 -7.715,-0.301 -10,2 -2.066,2.081 -0.321,7.576 -2,9 -3.03,2.57 -5.687,-2.25 -7,1 -1.284,3.176 2.471,3.865 3,8 0.438,3.422 -2.314,3.117 -1,6 2.595,5.692 23.359,21.369 26,22 8.893,2.125 11.746,-2.422 8,5 -0.895,1.772 -0.357,10.324 -2,13 -1.019,1.658 -3.881,-2.286 -7,0 -1.641,1.202 0.126,10.07 2,13 -0.229,-0.357 5.037,0.963 2,4 -2.408,2.408 -13.622,-3.116 -14,-3 -0.174,0.054 -8.77,9.768 -9,11 -0.374,2.001 3.049,12.65 5,15 -0.173,-0.208 5.048,3.669 5,3 0.367,5.136 -3.813,0.751 -7,7 -1.215,2.381 -0.007,7.155 -1,8 -2.483,2.113 -11.229,3.597 -14,0 -2.045,-2.652 3.648,-6.292 1,-11 -4.79,-8.514 -45.93,7.038 -53,3 -2.884,-1.647 0.111,-5.872 -3,-8 -2.189,-1.497 -4.642,0.777 -9,-1 -5.105,-2.082 -3.947,-5.188 -9,-4 -3.193,0.751 -3.589,-9.447 -3,-12 0.33,-1.427 2.759,0.393 4,-3 0.892,-2.438 -0.838,-5.172 0,-7 1.544,-3.368 12.706,-13.935 2,-17 -3.805,-1.09 -5.714,4.597 -10,3 -1.329,-0.495 -0.562,-7.056 -4,-8 -3.466,-0.952 -5.704,4.327 -7,4 -1.163,-0.293 -5.867,-9.771 -8,-1 0.035,-0.145 -0.007,7 0,7 -1.4,0.019 -3.862,-17.098 -1,-23 1.512,-3.118 16.71,-8.419 11,-21 -4.962,-10.933 -14.923,3.384 -19,1 -5.411,-3.164 0.201,-10.616 0,-14 -0.36,-6.067 -5.042,-11.51 -4,-18 1.688,-10.517 19.949,-13.629 24,-20 2.249,-3.536 0.479,-7.445 3,-9 1.291,-0.796 17.089,-0.761 16,-2 -0.653,-0.742 -8.819,13.244 -7,8 -3.07,8.849 1.04,29.966 12,32 6.521,1.21 24.644,-8.487 20,-15 -0.29,-0.407 -6.861,-0.595 -7,-1 -1.359,-3.986 2.915,-3.722 3,-8 -0.02,0.97 -2.068,-8.788 -3,-11 -1.231,-2.922 -5.001,-6.019 -5,-6 -0.268,-6.04 9.208,-13.737 12,-15 5.302,-2.398 11.504,0.551 13,-4 1.322,-4.022 -4.823,-6.074 -4,-9 0.596,-2.117 9.298,-3.276 9,-3 6.774,-6.286 1.921,-23.471 6,-26 3.84,-2.381 8.469,3.298 11,3 0.962,-0.113 3.81,-3.843 5,-4 2.879,-0.381 -0.15,2.984 5,3 2.279,0.007 2.285,-3.005 6,-4 2.237,-0.6 5.095,0.532 6,0 2.227,-1.31 3.229,-6.145 7,-9 1.251,-0.948 4.031,0.03 5,-1 5.398,-5.74 5.544,-14.428 15,-7 z").attr(attr)
    };
    china.lz = {
        name: "龙州县",
        color:'#53c6ff',
        id:"cz_lz",
        data:regionJsonObj.cz_lz,
        path: R.path("m 40,332 c 16.916,2.762 9.248,-11.468 11,-25 1.012,-7.811 7.313,-19.948 10,-20 4.325,-0.084 5.18,9.84 9,11 4.324,1.313 6.015,-2.582 11,-3 6.236,-0.523 13.672,4.851 16,-2 2.133,-6.278 -7.009,-11.493 -7,-16 0.025,-12.207 18.073,-12.122 19,-24 0.018,-0.226 -7.085,-16.628 -2,-9 5.269,7.903 19.5,8.59 26,16 2.113,2.409 1.706,8.387 3,10 1.057,1.317 5.593,0.641 8,3 2.634,2.581 1.464,9.327 5,11 7.692,3.64 14.883,-2.945 22,1 2.585,1.434 -0.057,1.927 2,4 0.437,0.44 2.862,1.516 3,2 0.188,0.661 -2.175,5.946 -1,8 1.771,3.095 5.472,1.6 9,5 2.398,2.312 1.556,6.153 3,7 2.111,1.239 5.367,-1.523 7,0 0.979,0.913 1.185,7.631 3,9 4.488,3.383 13.599,0.266 16,3 2.995,3.41 -0.273,11.319 3,13 1.506,0.773 14.127,-8.921 18,-4 0.709,0.901 0.313,10.738 -3,15 -2.309,2.97 -7.239,3.569 -8,5 -1.824,3.429 3.059,10.617 -3,13 -2.05,0.806 -7.661,-2.952 -8,-3 -8.367,-1.176 -18.023,2.749 -20,9 -1.537,4.859 4.471,14.948 1,21 -0.412,0.718 -10.289,6.797 -14,7 -1.594,0.087 -3.927,-2.814 -6,-2 -3.576,1.404 -4.412,4.439 -7,8 -1.792,2.464 -4.445,8.031 -6,9 -0.752,0.469 -5.126,-1.444 -7,-1 -4.852,1.149 -6.479,10.474 -10,12 -2.529,1.097 -7.875,-1.028 -12,0 -4.343,1.082 -7.187,7.707 -9,8 -0.291,0.047 -8.47,-1.688 -10,-5 -2.273,-4.918 3.492,-4.967 2,-9 -2.289,-6.187 -10.374,-0.382 -13,-2 -6.262,-3.858 -1.181,-5.42 -3,-10 -0.949,-2.391 -5.872,-9.718 -9,-12 -5.844,-4.264 -13.683,-3.332 -16,-9 -2.651,-6.485 4.652,-13.291 -5,-16 -5.631,-1.58 -22.333,4.672 -25,-2 -1.556,-3.895 5.637,-6.114 6,-11 0.231,-3.111 -3.06,-2.57 -4,-7 -1.516,-7.144 2.649,-11.735 -5,-15 0,-1 0,-2 0,-3 z").attr(attr)
    };
    china.dx = {
        name: "大新县",
        color:'#f9bd27',
        id:"cz_dx",
        data:regionJsonObj.cz_dx,
        path: R.path("m 127,126 c 0.667,0 1.333,0 2,0 -6.155,6.236 1.479,10.297 3,14 1.491,3.63 -1.379,3.13 -1,6 0.996,7.536 13.792,11.374 7,20 -5.381,6.835 -16.881,4.385 -17,12 -0.09,5.739 7.353,4.901 10,9 3.804,5.891 2.306,16.312 8,22 1.526,1.524 6.385,4.598 9,5 4.463,0.686 8.49,-3.381 15,-4 2.173,-0.207 7.228,2.002 9,1 1.587,-0.897 2.671,-8.388 4,-9 5.401,-2.488 9.521,3.98 14,2 5.977,-2.642 -0.836,-9.104 5,-14 2.146,-1.8 9.059,1.069 11,0 2.943,-1.62 1.64,-8.196 3,-9 4.782,-2.824 17.286,2.89 16,-7 -0.684,-5.259 -8.161,-2.883 -7,-7 0.742,-2.633 4.222,0.411 7,-1 3.584,-1.82 -0.192,-3.013 3,-4 1.311,-0.405 2.536,1.383 6,1 1.427,-0.158 4.035,-3.052 5,-3 4.203,0.228 20.065,8.383 20,-3 -0.035,-6.107 -13.399,-6.729 -3,-10 2.39,-0.751 7.567,0.074 7,-5 -0.592,-5.297 0.467,-1.28 8,-3 4.913,-1.122 5.507,-6.566 8,-5 2.263,1.421 -5.911,13.987 3,16 5.608,1.267 3.86,-4.35 9,-6 2.08,-0.668 11.796,-0.185 13,0 13.318,2.047 13.661,17.438 20,27 0,1 0,2 0,3 -1.588,3.724 -4.197,4.987 -5,10 -0.374,2.336 1.821,2.572 2,5 0.158,2.147 -1.798,4.543 -2,7 -0.7,8.515 3.347,13.242 -1,16 -1.809,1.147 -8.278,-3.264 -10,-3 -10.698,1.639 -3.928,20.446 -9,26 -3.38,3.7 -9.932,-1.101 -11,6 -1.011,6.717 10.478,6.821 -2,9 -6.993,1.221 -19.22,9.966 -19,18 0.099,3.607 4.335,3.93 6,8 0.358,0.877 -1.162,3.264 -1,5 0.432,4.625 3.254,1.458 3,5 -0.189,2.632 -4.835,4.949 -4,7 0.817,2.006 7.688,2.069 8,4 1.053,6.512 -13.062,11.629 -18,10 0.417,0.137 -6.835,-5.832 -8,-10 -0.864,-3.089 -0.756,-16.999 -1,-16 0.565,-2.316 10.097,-9.667 9,-12 -2.896,-6.16 -7.05,0.117 -12,1 -4.021,0.717 -1.849,-1.963 -7,-1 -8.324,1.556 -4.163,8.942 -8,13 -5.493,5.811 -20.541,5.418 -23,17 -1.011,4.759 5.095,19.432 3,21 0.15,-0.113 -16.32,-1.633 -17,-7 -0.693,-5.464 -2.966,-0.905 -9,-5 -0.844,-0.573 0.54,-4.354 -1,-6 -3.823,-4.087 -7.56,-0.824 -9,-3 -1.721,-2.601 1.385,-4.726 1,-7 -0.341,-2.017 -5.901,-9.483 -7,-10 -5.751,-2.705 -15.876,2.924 -22,-1 -1.583,-1.014 -0.106,-3.613 -3,-8 -1.513,-2.294 -6.369,-3.302 -8,-5 -1.455,-1.515 -0.988,-5.438 -3,-8 -8.818,-11.233 -31.317,-10.786 -27,-23 1.41,-3.99 21.395,-5.071 17,-20 -2.279,-7.743 -6.407,-0.244 -15,-3 -1.786,-0.573 -3.613,-5.169 -8,-8 -2.642,-1.705 -6.651,-1.511 -8,-3 -1.18,-1.302 -2.133,-9.355 -5,-11 -4.521,-2.593 -8.721,3.022 -11,-2 -2.831,-6.238 13.192,-8.248 15,-14 1.031,-3.279 -3.903,-3.566 -1,-6 2.058,-1.726 7.975,0.148 10,-1 2.914,-1.652 3.81,-9.711 7,-13 4.768,-4.915 6.941,-0.177 9,-6 1.357,-3.838 -3.329,-3.975 -3,-8 0.171,-2.095 6.137,-3.462 8,-9 1.132,-3.366 -1.574,-4.729 3,-7 z").attr(attr)
    };
    china.td = {
        name: "天等县",
        id:"cz_td",
        color:'#ccadfb',
        data:regionJsonObj.cz_td,
        path: R.path("m 262,49 c -0.081,0.017 12.669,0.717 15,2 3.945,2.171 4.539,9.031 7,14 1.255,2.534 5.627,7.048 6,9 3.38,17.706 -26.322,28.537 -13,46 1.497,1.962 10.074,6.547 10,6 0.751,5.527 -6.113,2.881 -12,6 -2.356,1.248 -2.968,4.362 -5,5 -5.744,1.803 -8.725,-3.101 -11,1 -1.214,2.188 2.192,4.971 1,6 -4.498,3.883 -6.974,-2.853 -10,2 -4.866,7.805 6.326,6.098 6,10 -0.866,10.358 -12.486,1.207 -15,1 -1.729,-0.142 -2.87,2.622 -7,3 -1.949,0.179 -3.671,-1.379 -5,-1 -2.117,0.604 -2.853,3.087 -5,4 -4.291,1.824 -11.511,-0.296 -9,7 -0.821,-2.385 7.029,4.895 7,5 -2.157,7.718 -12.165,0.306 -16,4 -1.725,1.661 1.461,7.421 -1,9 -2.955,1.895 -4.707,-2.87 -10,-1 -6.836,2.415 -0.073,10.597 -5,14 -5.616,3.878 -13.909,-8.611 -18,2 -3.067,7.956 -0.546,3.957 -8,4 -5.171,0.03 -10.108,5.708 -17,4 -9.573,-2.372 -11.03,-19.105 -14,-24 -1.422,-2.344 -8.891,-4.951 -9,-8 -0.204,-5.701 14.664,-6.025 17,-13 4.15,-12.391 -5.927,-15.148 -7,-20 -0.682,-3.083 2.276,-2.629 1,-6 -0.624,-1.648 -4.567,-3.66 -5,-6 -0.285,-1.54 3.882,-8.692 1,-11 0.634,0.508 -12.119,1.743 -13,2 -0.129,0.038 -9.616,6.002 -11,5 -4.163,-3.016 3.754,1.661 3,-7 -0.274,-3.146 -3.6,-1.854 -3,-5 0.592,-3.108 4.571,-3.61 6,-8 0.762,-2.34 -0.837,-6.647 0,-8 0.494,-0.798 8.033,-7.157 11,-8 2.323,-0.66 6.128,1.193 9,0 4.041,-1.678 6.322,-6.791 9,-8 4.402,-1.988 12.298,1.745 14,-6 0.388,-1.764 -2.105,-4.809 -1,-7 0.702,-1.393 3.853,0.151 6,-3 5.541,-8.131 -1.08,-5.004 9,-6 5.398,-0.534 10.4,-5.911 15,-4 4.794,1.992 3.176,10.719 6,12 6.002,2.723 10.347,-5.857 18,-7 2.55,-0.381 7.263,1.507 9,1 6.791,-1.982 10.375,-12.689 16,-13 4.916,-0.271 7.674,5.709 10,6 10.705,1.339 7.737,-7.932 18,-10 z").attr(attr)
    };
    
}