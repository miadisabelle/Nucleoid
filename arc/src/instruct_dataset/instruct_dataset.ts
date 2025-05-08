import Zoom from "../lib/Zoom";
import coreData from "./dataset.core.json";
import curveData from "./dataset.curve.json";
import lineData from "./dataset.line.json";
import nucleoid from "./nucleoid.md";
// import arc from "./arc.md";

type Instance = {
  instance_name: string;
  input_code: string;
  input_instance: any;
  output_instance: any;
  output_value: any;
};

type DatasetItem = {
  input_matrix: number[][];
  output_matrix: number[][];
  instances: Instance[];
};

type DatasetFile = {
  declarations: string[];
  dataset: DatasetItem[];
};

const datasetFiles: DatasetFile[] = [coreData, lineData, curveData];

const dataset = datasetFiles.map(({ declarations, dataset }) => ({
  declarations,
  dataset: dataset.map(({ input_matrix, output_matrix, instances }) => ({
    input_matrix,
    output_matrix,
    instances: instances.map(
      ({
        instance_name,
        input_code,
        input_instance,
        output_instance,
        output_value,
      }) => ({
        instance_name,
        input_code,
        input_instance,
        input_object: Zoom.focus(input_instance),
        output_object: Zoom.focus(output_instance),
        output_value,
      })
    ),
  })),
}));

export function document(): string {
  return `
    ${nucleoid}
    instruct_dataset:
    ${JSON.stringify(dataset)}      
  `;
}

