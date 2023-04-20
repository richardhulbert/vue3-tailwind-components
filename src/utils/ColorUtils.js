export default class ColorUtils {
    /**
     * Takes one color and returns a darker or lighter version depending on how dark or light the parameter colour is.
     *
     * @param {string} c the hex color ie '#737373'
     * @param {int} [factor] how dark or light you want default is 135
     * @return {string}
     */
    contrastingColor(c,factor= 135){
        c = c.replace(/^\s*#|\s*$/g, '');
        let r = parseInt(c.substring(0, 2), 16),
            g = parseInt(c.substring(2, 4), 16),
            b = parseInt(c.substring(4, 6), 16);
        let darken= r+g+b > 383  // is it a dark colour or a light colour // about half the max value 725
        if (darken) factor=factor*-1;
        r= this._sanitiseRGB(r+factor);
        g= this._sanitiseRGB(g+factor);
        b= this._sanitiseRGB(b+factor);

        return '#'+r.toString(16)+g.toString(16)+b.toString(16)
    }
    _sanitiseRGB(val){
        if(val<=0) return 0;
        if(val>255 ) return 255
        return val;
    }
}
