/**
 *
 * @param {*} jsonObj : json 파일의 정보
 * @param {*} rootName : export 할 객체의 이름
 * @returns
 */
export function jsonToTypescript(jsonObj, rootName) {
  const interfaces = [];
  const objects = [];
  const summary = `/**\n * css 변수 이름을 담고 있는 객체입니다.\n */\n`;
  const exportCommand = `export default ${toCamelCase(rootName)};`;

  function toCamelCase(str) {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  function processObject(obj, name, parentKey = "") {
    const keys = Object.keys(obj);
    const interfaceName = `${name[0].toUpperCase()}${toCamelCase(
      name.slice(1)
    )}`;
    const objectName = toCamelCase(name);
    const interfaceLines = [`interface ${interfaceName} {`];
    const objectLines = [`const ${objectName}: ${interfaceName} = {`];

    keys.forEach((key) => {
      const value = obj[key];
      const camelCaseKey = toCamelCase(key);

      if (typeof value === "object" && !Array.isArray(value)) {
        const childInterfaceName = processObject(
          value,
          key,
          `${parentKey}${name}-`
        );
        interfaceLines.push(`  ${camelCaseKey}: ${childInterfaceName};`);
        objectLines.push(`  ${camelCaseKey}: ${camelCaseKey},`);
      } else {
        const varName = `--${parentKey}${name}-${key}`;
        const cssVarName = varName.replace(`${rootName}-`, "");
        interfaceLines.push(`  ${camelCaseKey}: string;`);
        objectLines.push(`  ${camelCaseKey}: "${cssVarName}",`);
      }
    });

    interfaceLines.push("}");
    objectLines.push("};");

    interfaces.push(interfaceLines.join("\n"));
    objects.push(objectLines.join("\n"));

    return interfaceName;
  }

  processObject(jsonObj, rootName);

  // 마지막 객체에 summary를 추가
  const lastObjectIndex = objects.length - 1;
  objects[lastObjectIndex] = summary + objects[lastObjectIndex];

  return [...interfaces, ...objects, exportCommand].join("\n\n");
}

/**
 * json 파일의 내용을 문자열로 변환해주는 함수
 * @param jsonObj : Object
 * @returns string
 */
function jsonToCssVars(jsonObj) {
  const result = [];

  function processObj(obj, prefix) {
    for (const key in obj) {
      if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
        processObj(obj[key], `${prefix}-${key}`);
      } else {
        //객체가 아닐 경우
        //앞서 존재할 접두사와 현재 key값을 연결
        const varName = `${prefix}-${key}`
          .replace(/([A-Z])/g, "-$1")
          .toLowerCase();
        result.push(`-${varName}:${obj[key]};`);
      }
    }
  }

  processObj(jsonObj, "");
  return result.join("\n");
}

/**
 * 읽어온 토큰에서 <style>태그에 세팅할 문자열을 반환하는 함수
 *  @param jsonData : 로드되어 parse된 데이터
 * @returns string
 */
export function setTokenintoStyle(jsonData) {
  const cssVars = jsonToCssVars(jsonData);
  console.log("👩‍💻 cssVars를 체크합니다. ", cssVars);
  const cssRootContents = `
  /*
  * HTML의 style에 설정하기 위한 문자열입니다. 서버가 시작될 시 자동으로 세팅됩니다. 
  *
  */
  export const settingTokenIntoHTML = \`
  :root{
    ${cssVars}
  }
  \`
  `;

  return cssRootContents;
}
