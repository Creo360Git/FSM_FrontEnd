import { CsvBuilder } from "filefy";
import moment from "moment";


const CsvExport = (
    renderColumns,
    rows = [],
    filename = "file",
    delimiter = ","
) => {
    try {
        let finalData = rows;
        if (rows.length && !Array.isArray(rows[0])) {
            if (typeof rows[0] === "object") {
            finalData = rows.map((row) =>
                renderColumns.map((col) =>
                col.exportTransformer ? col.exportTransformer(row) : row[col.name]
                )
            );
            }
        }
        const builder = new CsvBuilder(`${filename}-${moment().format('LLL')}` + ".csv");
        builder
            .setDelimeter(delimiter)
            .setColumns(renderColumns.map((col) => col.label))
            .addRows(Array.from(finalData))
            .exportFile();
    } catch (err) {
        console.error(`error in ExportCsv : ${err}`);
    }
}

export default CsvExport