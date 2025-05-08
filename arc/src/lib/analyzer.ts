import Matrix from "./Matrix";
import Zoom from "./Zoom";
import llm from "./llm";
import nucleoid from "./nucleoid";

interface DeclarationResult {
  declarations: string[];
}

interface InstanceObject {
  x_position: number;
  y_position: number;
  object_matrix: number[][];
}

interface Instance {
  input_object: InstanceObject;
  output_object: InstanceObject;
  input_instance?: number[][];
  output_instance?: number[][];
}

interface InstancesResult {
  instances: Instance[];
}

interface ValueParams {
  train_session_id: string;
  instance_name: string;
  declarations: string[];
  input_object: InstanceObject;
  output_object: InstanceObject;
}

interface ValueResult {
  input_code: string;
  output_value: any;
}

async function declarations({
  train_dataset,
}: {
  train_dataset: any;
}): Promise<DeclarationResult> {
  console.log("Analyzing declarations...");

  const { declarations } = await llm.generate({
    messages: [
      {
        role: "user",
        content: `
          train_dataset:
          ${JSON.stringify(train_dataset)}
          json_format:
          { "declarations": <NUC_DECLARATIONS> }
        `,
      },
    ],
  });

  console.debug("declarations:");
  console.debug(declarations);

  return { declarations };
}

async function instances({
  declarations,
  input_matrix,
  output_matrix,
}: {
  declarations: string[];
  input_matrix: number[][];
  output_matrix: number[][];
}): Promise<InstancesResult> {
  console.log("Extracting instances...");

  const { instances } = await llm.generate({
    messages: [
      {
        role: "user",
        content: `
          declarations:
          ${JSON.stringify(declarations)}
          input_matrix:
          ${JSON.stringify(input_matrix)}
          output_matrix:
          ${JSON.stringify(output_matrix)}
          query:
          Obj;
          json_format:
          {
            "instances": [{
              "input_object": { "x_position": <INPUT_X_POSITION>, "y_position": <INPUT_Y_POSITION>, "object_matrix" = <INPUT_OBJECT_MATRIX> },
              "output_object": { x_position: <OUTPUT_X_POSITION>, "y_position": <OUTPUT_Y_POSITION>, "object_matrix" = <OUTPUT_OBJECT_MATRIX> }
            }]
          }
        `,
      },
    ],
  });

  instances.forEach((instance: Instance) => {
    const { input_object, output_object } = instance;
    const rows = input_matrix.length;
    const cols = input_matrix[0].length;

    instance.input_instance = Zoom.enlarge(input_object, rows, cols);
    instance.output_instance = Zoom.enlarge(output_object, rows, cols);
  });

  instances.forEach((instance: Instance) => {
    Matrix.toString(instance.input_instance);
    console.debug(
      JSON.stringify({
        x_position: instance.input_object.x_position,
        y_position: instance.input_object.y_position,
      })
    );
    Matrix.toString(instance.input_object.object_matrix);
    Matrix.toString(instance.output_instance);
    console.debug(
      JSON.stringify({
        x_position: instance.output_object.x_position,
        y_position: instance.output_object.y_position,
      })
    );
    Matrix.toString(instance.output_object.object_matrix);
    console.debug("--");
  });
  console.log("");

  return { instances };
}

async function value({
  train_session_id,
  instance_name,
  declarations,
  input_object,
  output_object,
}: ValueParams): Promise<ValueResult> {
  console.log("Calculating value...");

  const { input_code } = await llm.generate({
    messages: [
      {
        role: "user",
        content: `
          instance_name:
          ${instance_name}
          declarations:
          ${declarations.join("\n")}
          input_object:
          ${JSON.stringify(input_object)}
          output_object:
          ${JSON.stringify(output_object)}
          json_format:
          { "input_code": <NUCLEOID_CODE> }
        `,
      },
    ],
  });

  console.log("Creating instance in Nucleoid...");
  const output_value = await nucleoid.run(train_session_id, input_code);

  console.debug("input_code:");
  console.debug(input_code);
  console.debug("output_value:");
  console.debug(output_value);

  return { input_code, output_value };
}

export default {
  instances,
  declarations,
  value,
};
