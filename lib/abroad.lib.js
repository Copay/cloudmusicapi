/*
 * 从NeteaseMusicWEB页扒下来的,国外请求加密内容解密方法.
 * Authors:Netease
 *
 */
function bNj(){
        var yE = function (jR) {
            if (jR < -128) {
                return yE(128 - (-128 - jR))
            } else if (jR >= -128 && jR <= 127) {
                return jR
            } else if (jR > 127) {
                return yE(-129 + jR - 127)
            } else {
                throw new Error("1001")
            }
        };
        var bNi = function (jR, cq) {
            return yE(jR + cq)
        };
        var bNh = function (QF, biw) {
            if (QF == null) {
                return null
            }
            if (biw == null) {
                return QF
            }
            var pJ = [];
            var bNg = biw.length;
            for (var i = 0, cF = QF.length; i < cF; i++) {
                pJ[i] = bNi(QF[i], biw[i % bNg])
            }
            return pJ
        };
        var bNc = function (QM) {
            if (QM == null) {
                return QM
            }
            var pJ = [];
            var bMX = QM.length;
            for (var i = 0, cF = bMX; i < cF; i++) {
                pJ[i] = yE(0 - QM[i])
            }
            return pJ
        };
        var bMW = function (biP, Iv) {
            biP = yE(biP);
            Iv = yE(Iv);
            return yE(biP ^ Iv)
        };
        var bvv = function (Iu, bjf) {
            if (Iu == null || bjf == null || Iu.length != bjf.length) {
                return Iu
            }
            var pJ = [];
            var bMR = Iu.length;
            for (var i = 0, cF = bMR; i < cF; i++) {
                pJ[i] = bMW(Iu[i], bjf[i])
            }
            return pJ
        };
        var bvw = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        var bMO = function (ej) {
            var ES = [];
            ES.push(bvw[ej >>> 4 & 15]);
            ES.push(bvw[ej & 15]);
            return ES.join("")
        };
        var bMN = function (Cv) {
            var cF = Cv.length;
            if (Cv == null || cF < 0) {
                return new String("")
            }
            var ES = [];
            for (var i = 0; i < cF; i++) {
                ES.push(bMO(Cv[i]))
            }
            return ES.join("")
        };
        var bvx = function (QT) {
            if (QT == null || QT.length == 0) {
                return QT
            }
            var bjy = new String(QT);
            var pJ = [];
            var cF = bjy.length / 2;
            var cq = 0;
            for (var i = 0; i < cF; i++) {
                var nS = parseInt(bjy.charAt(cq++), 16) << 4;
                var nP = parseInt(bjy.charAt(cq++), 16);
                pJ[i] = yE(nS + nP)
            }
            return pJ
        };
        var bML = function (dT) {
            if (dT == null || dT == undefined) {
                return dT
            }
            var Il = encodeURIComponent(dT);
            var Cv = [];
            var bvy = Il.length;
            for (var i = 0; i < bvy; i++) {
                if (Il.charAt(i) == "%") {
                    if (i + 2 < bvy) {
                        Cv.push(bvx(Il.charAt(++i) + "" + Il.charAt(++i))[0])
                    } else {
                        throw new Error("1009")
                    }
                } else {
                    Cv.push(Il.charCodeAt(i))
                }
            }
            return Cv
        };
        var bME = function (uF) {
            var cA = 0;
            cA += (uF[0] & 255) << 24;
            cA += (uF[1] & 255) << 16;
            cA += (uF[2] & 255) << 8;
            cA += uF[3] & 255;
            return cA
        };
        var cfl = function (cA) {
            var uF = [];
            uF[0] = cA >>> 24 & 255;
            uF[1] = cA >>> 16 & 255;
            uF[2] = cA >>> 8 & 255;
            uF[3] = cA & 255;
            return uF
        };
        var bMz = function (eR, Vq, cF) {
            var kb = [];
            if (eR == null || eR.length == 0) {
                return kb
            }
            if (eR.length < cF) {
                throw new Error("1003")
            }
            for (var i = 0; i < cF; i++) {
                kb[i] = eR[Vq + i]
            }
            return kb
        };
        var Vr = function (eR, Vq, Re, bMx, cF) {
            if (eR == null || eR.length == 0) {
                return Re
            }
            if (Re == null) {
                throw new Error("1004")
            }
            if (eR.length < cF) {
                throw new Error("1003")
            }
            for (var i = 0; i < cF; i++) {
                Re[bMx + i] = eR[Vq + i]
            }
            return Re
        };
        var bMw = function (cF) {
            var cH = [];
            for (var i = 0; i < cF; i++) {
                cH[i] = 0
            }
            return cH
        };
        var bMv = [82, 9, 106, -43, 48, 54, -91, 56, -65, 64, -93, -98, -127, -13, -41, -5, 124, -29, 57, -126, -101, 47, -1, -121, 52, -114, 67, 68, -60, -34, -23, -53, 84, 123, -108, 50, -90, -62, 35, 61, -18, 76, -107, 11, 66, -6, -61, 78, 8, 46, -95, 102, 40, -39, 36, -78, 118, 91, -94, 73, 109, -117, -47, 37, 114, -8, -10, 100, -122, 104, -104, 22, -44, -92, 92, -52, 93, 101, -74, -110, 108, 112, 72, 80, -3, -19, -71, -38, 94, 21, 70, 87, -89, -115, -99, -124, -112, -40, -85, 0, -116, -68, -45, 10, -9, -28, 88, 5, -72, -77, 69, 6, -48, 44, 30, -113, -54, 63, 15, 2, -63, -81, -67, 3, 1, 19, -118, 107, 58, -111, 17, 65, 79, 103, -36, -22, -105, -14, -49, -50, -16, -76, -26, 115, -106, -84, 116, 34, -25, -83, 53, -123, -30, -7, 55, -24, 28, 117, -33, 110, 71, -15, 26, 113, 29, 41, -59, -119, 111, -73, 98, 14, -86, 24, -66, 27, -4, 86, 62, 75, -58, -46, 121, 32, -102, -37, -64, -2, 120, -51, 90, -12, 31, -35, -88, 51, -120, 7, -57, 49, -79, 18, 16, 89, 39, -128, -20, 95, 96, 81, 127, -87, 25, -75, 74, 13, 45, -27, 122, -97, -109, -55, -100, -17, -96, -32, 59, 77, -82, 42, -11, -80, -56, -21, -69, 60, -125, 83, -103, 97, 23, 43, 4, 126, -70, 119, -42, 38, -31, 105, 20, 99, 85, 33, 12, 125];
        var EH = 64;
        var Rk = 64;
        var bvB = 4;
        var bMq = function (pu) {
            var bvF = [];
            if (pu == null || pu == undefined || pu.length == 0) {
                return bMw(Rk)
            }
            if (pu.length >= Rk) {
                return bMz(pu, 0, Rk)
            } else {
                for (var i = 0; i < Rk; i++) {
                    bvF[i] = pu[i % pu.length]
                }
            }
            return bvF
        };
        var bMj = function (Ru) {
            if (Ru == null || Ru.length % EH != 0) {
                throw new Error("1005")
            }
            var VJ = [];
            var cq = 0;
            var bMh = Ru.length / EH;
            for (var i = 0; i < bMh; i++) {
                VJ[i] = [];
                for (var j = 0; j < EH; j++) {
                    VJ[i][j] = Ru[cq++]
                }
            }
            return VJ
        };
        var bMb = function (bvQ) {
            var nS = bvQ >>> 4 & 15;
            var nP = bvQ & 15;
            var cq = nS * 16 + nP;
            return bMv[cq]
        };
        var bvS = function (VU) {
            if (VU == null) {
                return null
            }
            var bvU = [];
            for (var i = 0, cF = VU.length; i < cF; i++) {
                bvU[i] = bMb(VU[i])
            }
            return bvU
        };
        var bLS = function (ED, pu) {
            if (ED == null) {
                return null
            }
            if (ED.length == 0) {
                return []
            }
            if (ED.length % EH != 0) {
                throw new Error("1005")
            }
            pu = bMq(pu);
            var Wc = pu;
            var Wd = bMj(ED);
            var HL = [];
            var bLR = Wd.length;
            for (var i = 0; i < bLR; i++) {
                var Wm = bvS(Wd[i]);
                Wm = bvS(Wm);
                var Wn = bvv(Wm, Wc);
                var bLO = bNh(Wn, bNc(Wc));
                Wn = bvv(bLO, pu);
                Vr(Wn, 0, HL, i * EH, EH);
                Wc = Wd[i]
            }
            var bvV = [];
            Vr(HL, HL.length - bvB, bvV, 0, bvB);
            var cF = bME(bvV);
            if (cF > HL.length) {
                throw new Error("1006")
            }
            var pJ = [];
            Vr(HL, 0, pJ, 0, cF);
            return pJ
        };
        var bLL = function (Rz, bN) {
            if (Rz == null) {
                return null
            }
            var bvW = new String(Rz);
            if (bvW.length == 0) {
                return []
            }
            var ED = bvx(bvW);
            if (bN == null || bN == undefined) {
                throw new Error("1007")
            }
            var pu = bML(bN);
            return bLS(ED, pu)
        };
        this.bLB = function (Rz, bN) {
            if(!bN){
                var bN = "fuck~#$%^&*(458";
            }
            var bLA = bLL(Rz, bN);
            var Ww = new String(bMN(bLA));
            var RA = [];
            var bLr = Ww.length / 2;
            var cq = 0;
            for (var i = 0; i < bLr; i++) {
                RA.push("%");
                RA.push(Ww.charAt(cq++));
                RA.push(Ww.charAt(cq++))
            }
            return RA.join("")
        }
    };
    var settmusic = (new bNj).bLB;
    exports.decode = function(encodedData){
        return JSON.parse(decodeURIComponent(settmusic(encodedData)));
    }