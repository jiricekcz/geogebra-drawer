import unzip from 'unzipper';
import fs from 'fs';
import xml2Js from 'xml2js';
const pointCommands = ["Intersect"];
export default function parse(filename: string): Promise<ggbJSON> {
    return new Promise<ggbJSON>((resolve, reject) => {
        const rv: ggbJSON = {
            xZero: 0, yZero: 0, xScale: 1, yScale: 1, elements: [], commands: [], labels: []
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


                // Elements 
                const construction = json.geogebra.construction;
                const elements = construction[0].element;
                const commands = construction[0].command;
                for (const element of elements) {
                    if (element.$.type !== "point") {
                        rv.labels.push(element.$.label);
                        continue;
                    }
                    rv.elements.push({
                        type: "point",
                        label: element.$.label,
                        x: element.coords[0].$.x,
                        y: element.coords[0].$.y
                    })
                }
                for (const command of commands) {
                    if (pointCommands.includes(command.$.name)) continue;
                        var inputs = [];
                    for (var h in command.input[0].$) {
                        inputs.push(command.input[0].$[h]);
                    }
                    var outputs = [];
                    for (var h in command.output[0].$) {
                        outputs.push(command.output[0].$[h]);
                    }
                    rv.commands.push({
                        type: command.$.name,
                        inputs,
                        outputs
                    })
                } 
                fs.writeFileSync("./ggbFile/geogebra.json", JSON.stringify(elements));

                return resolve(rv);
            })
        });
    })
}
declare interface ggbJSON {
    xZero: number;
    yZero: number;
    xScale: number;
    yScale: number;
    elements: Array<Point>;
    commands: Array<Command>;
    labels: Array<string>;
}
declare interface Element {
    type: string;
    label: string;
}
declare interface Point extends Element {
    type: "point"
    x: number;
    y: number;
}
declare interface Command {
    type: string;
    inputs: Array<string>;
    outputs: Array<string>;
}