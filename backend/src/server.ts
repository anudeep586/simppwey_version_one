import { Octokit } from "@octokit/rest";
// var validate = require("validate-npm-package-name");
// var cssValidate = require("css-validator");
// import cssValidator = require("w3c-css-validator");
// // var PJV=require('package-json-validator').PJV;
// const PJV = require("../src/Models/packageValidator").PJV;
// let Components: any = {};
// let Functions:any={}
// async function run(path: any) {
//     const octokit = new Octokit({
//     auth: "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",
//   });
//   const { data } = await octokit.repos.getContent({
//     owner: "anudeep586",
//     repo: "toll_task",
//     path: `/${path}`,
//   });
//   const k: any = data;
//   if (k.content && path.includes(".cssdfds")) {
//      console.log(path);
//     const buff = Buffer.from(k.content, "base64");
//     let text = buff.toString("ascii");
//     const result = await cssValidator.validateText(text);
//     console.log(result)
//   }
//   else if (k.content && path.includes("package.json")) {
//     console.log(path);
//     const buff = Buffer.from(k.content, "base64");
//     let text = buff.toString("ascii");
//     const data=PJV.validate(text)
//     console.log(data)
//   }
//   else if (k.content && path.includes(".jsxdfds")) {
//     //  console.log(path);
//     const buff = Buffer.from(k.content, "base64");
//     let text = buff.toString("ascii");
//     const arr = text.match(/\w+/g);
//     let count = 0;
//     let divCount = 0;
//     let divOriginalCount = 0;
//     let mistakeDivErrorCount = 0;
//     let afterImport = 0;
//     let returnCheck=0;
//     let itemCheck=0;
//     let constCheck=0;
//     arr.map((item) => {
//       const data = validate(item);
//       if (
//         data.validForNewPackages === false ||
//         data.validForOldPackages === false
//       ) {
//         count += 1;
//       }
//       if(itemCheck===1 && constCheck===2 && returnCheck===0 && item!=='return'){
//         if(typeof Functions[item]===typeof 4){
//           Functions[item]=Functions[item]+1;
//         }
//         else{
//           Functions[item]=1
//         }
//       }
//       if(constCheck===1){
//         constCheck=2
//       }
//       if (afterImport === 1) {
//         if (typeof Components[item] === typeof 4) {
//           Components[item] = Components[item] + 1;
//         } else {
//           Components[item] = 1;
//         }
//         afterImport = 0;
//       }
//       if (item === "import") {
//         itemCheck=1;
//         afterImport = 1;
//       }
//       if(item==="const"){
//         constCheck=1
//       }
//       if(item==="return"){
//         returnCheck=1
//       }
//       if (item === "div" && divCount === 0) {
//         divCount = 1;
//         divOriginalCount = divOriginalCount + 1;
//       }

//       if (item === "id") {
//         divCount = 0;
//       }
//       if (item === "div" && divCount === 1) {
//         divCount = 0;
//         mistakeDivErrorCount = mistakeDivErrorCount + 1;
//       }
//     });
//       console.log(path, count, mistakeDivErrorCount, divOriginalCount);
//       //console.log(Components);
//     console.log("Functions",Functions)
//   }
// }
// async function run1() {
//     const octokit1 = new Octokit({
//     auth: "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",
//   });
//   let owner = "anudeep586";
//   let repo = "toll_task";
//   let BRANCH = "main";
//   const { data } = await octokit1.request(
//     `GET /repos/${owner}/${repo}/git/trees/${BRANCH}?recursive=1`,
//     {
//       owner: "anudeep586",
//       repo: "toll_task",
//       tree_sha: "TREE_SHA",
//     }
//   );
//   data.tree.map((item: any) => {
//     let filename = item.path.replace(/^.*[\\\/]/, "");
//     if (filename.includes(".jsx") || filename.includes(".css") || filename.includes("package.json"))
//       Components[filename.slice(0, filename.length - 3)] = 0;
//   });
//   data.tree.map(async (item: any) => {
//     await run(item.path);
//   });
// }
// run1();

// Reactjs

// let Components: any = {};
// async function run(path: any) {
//   const octokit = new Octokit({
//     auth: "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",
//   });
//   const { data } = await octokit.repos.getContent({
//     owner: "simppwey",
//     repo: "Charizard",
//     path: `/${path}`,
//   });
//   const k: any = data;
//   if (k.content && path.includes(".csdsfdss")) {
//     const buff = Buffer.from(k.content, "base64");
//     let text = buff.toString("ascii");
//     console.log(text)
//     const result = await cssValidator.validateText(text);
//     console.log(result)
//   }
//   else if (k.content && path.includes("package.json")) {
//          console.log(path);
//     const buff = Buffer.from(k.content, "base64");
//     let text = buff.toString("ascii");
//     // console.log(text)
//      text=JSON.stringify({
//       "name": "packageJsonValidator",
//       "version": "0.1.0",
//       "private": true,
//       "dependencies": {
//         "date-fns": "^2.29.3",
//         "install": "^0.13.0",
//         "react": "^18.2.0",
//         "react-chartjs-2": "^5.0.1",
//         "react-dom": "^18.2.0",
//         "react-material-ui-carousel": "^3.4.2",
//         "react-multi-carousel": "^2.8.2",
//         "react-redux": "^8.0.5",
//         "react-router-dom": "^6.4.3",
//         "react-scripts": "5.0.1",
//         "redux": "^4.2.0",
//         "styled-components": "^5.3.6",
//         "web-vitals": "^2.1.4"
//       },
//       "scripts": {
//         "start": "react-scripts start"
//       },
//       "eslintConfig": {
//         "extends": [
//           "react-app",
//           "react-app/jest"
//         ]
//       },
//       "browserslist": {
//         "production": [
//           ">0.2%",
//           "not dead",
//           "not op_mini all"
//         ],
//         "development": [
//           "last 1 chrome version",
//           "last 1 firefox version",
//           "last 1 safari version"
//         ]
//       }
//     })
//     const data=PJV.validate(text)
//     console.log(data)

//   }
//   else if (k.content && path.includes(".jsxdujsds")) {
//     // console.log(path);
//     const buff = Buffer.from(k.content, "base64");
//     let text = buff.toString("ascii");
//     const arr = text.match(/\w+/g);
//     let count = 0;
//     let divCount = 0;
//     let divOriginalCount = 0;
//     let mistakeDivErrorCount = 0;
//     let afterImport = 0;
//     // console.log(arr)
//     arr.map((item) => {
//       const data = validate(item);
//       if (
//         data.validForNewPackages === false ||
//         data.validForOldPackages === false
//       ) {
//         count += 1;
//       }
//       if (afterImport === 1) {
//         if (typeof Components[item] === typeof 4) {
//           Components[item] = Components[item] + 1;
//         } else {
//           Components[item] = 1;
//         }
//         afterImport = 0;
//       }
//       if (item === "import") {
//         afterImport = 1;
//       }
//       if (item === "div" && divCount === 0) {
//         divCount = 1;
//         divOriginalCount = divOriginalCount + 1;
//       }
//       if (item === "id") {
//         divCount = 0;
//       }
//       if (item === "div" && divCount === 1) {
//         divCount = 0;
//         mistakeDivErrorCount = mistakeDivErrorCount + 1;
//       }
//     });
//     // console.log(path, count, mistakeDivErrorCount, divOriginalCount);
//     //  console.log(Components);
//   }
// }
// async function run1() {
//   const octokit1 = new Octokit({
//     auth: "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",
//   });
//   let owner = "simppwey";
//   let repo = "Charizard";
//   let BRANCH = "develop";
//   const { data } = await octokit1.request(
//     `GET /repos/${owner}/${repo}/git/trees/${BRANCH}?recursive=1`,
//     {
//       owner: "simppwey",
//       repo: "Charizard",
//       tree_sha: "TREE_SHA",
//     }
//   );
//   data.tree.map((item: any) => {
//     let filename = item.path.replace(/^.*[\\\/]/, "");
//     if (filename.includes(".json"))
//       Components[filename.slice(0, filename.length - 3)] = 0;
//   });
//   // console.log(Components);
//   data.tree.map(async (item: any) => {
//     await run(item.path);
//   });
// }
// run1();

//Angular

async function run(path: any) {
  const octokit = new Octokit({
    auth: "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",
  });
  const { data } = await octokit.repos.getContent({
    owner: "anudeep586",
    repo: "PhotframedUI",
    path: `/${path}`,
  });
  const k: any = data;
  if (k.content && path.includes(".css")) {
    const buff = Buffer.from(k.content, "base64");
    let text = buff.toString("ascii");
    const cssValidator = require('w3c-css-validator');
    const result = await cssValidator.validateText(text);
    console.log("==========>288 line",result)
  } else if (k.content && path.includes("package.json")) {
  } else if (k.content && path.includes(".html")) {
    const buff = Buffer.from(k.content, "base64");
    let text = buff.toString("ascii");
    (async () => {
      const validator = require("html-validator");
      const options = {
        url: "http://url-to-validate.com",
        format: "text",
        data: text,
      };
      try {
        const result = await validator(options);
        let arr = result.split(' ');
        let count=0
        for(let i=0;i<arr.length;i++){
          if(arr[i].includes('Error')){
            count+=1
          }
        }
        console.log("==================>type",count);
      } catch (error) {
        console.error(error,);
      }
    })();
  }
}
async function run1() {
  const octokit1 = new Octokit({
    auth: "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",
  });
  let owner = "anudeep586";
  let repo = "PhotframedUI";
  let BRANCH = "main";
  const { data } = await octokit1.request(
    `GET /repos/${owner}/${repo}/git/trees/${BRANCH}?recursive=1`,
    {
      owner: "anudeep586",
      repo: "PhotframedUI",
      tree_sha: "TREE_SHA",
    }
  );
  data.tree.map(async (item: any) => {
    let filename = item.path.replace(/^.*[\\\/]/, "");
    if (filename.includes(".css") || filename.includes(".html"))
    await run(item.path);
  });
}
run1();
