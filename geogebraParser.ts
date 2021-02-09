import unzip from 'unzipper';
import fs from 'fs';
import xml2Js from 'xml2js';

export default function parse(filename: string): Promise<ggbJSON> {
    return new Promise<ggbJSON>((resolve, reject) => {
        const rv: ggbJSON = {
            xZero: 0, yZero: 0, xScale: 1, yScale: 1
        }
        fs.createReadStream(filename).pipe(unzip.Parse()).on("entry", async e => {
            // HANDLE GEOGERBA BULLSHIT
            if (e.path !== "geogebra.xml") return;
            const xml = (await e.buffer()).toString();
            fs.writeFileSync("./ggbFile/geogebra.xml", xml);

            //HANDLE GEOGEBRA XML
            xml2Js.parseString(xml, (err, result) => {
                const json = result;

                // Basics
                const euclidian = json.geogebra.euclidianView;
                const coordSys = euclidian[0].coordSystem[0]["$"];
                rv.xScale = coordSys.scale;
                rv.xZero = coordSys.xZero;
                rv.yScale = coordSys.yscale;
                rv.yZero = coordSys.yZero;

                fs.writeFileSync("./ggbFile/geogebra.json", JSON.stringify(coordSys));

                return resolve(rv);
            })
        });
    })
}
declare interface ggbJSON extends Object {
    xZero: number;
    yZero: number;
    xScale: number;
    yScale: number;
}