import { v4 as uuidv4 } from "uuid";
const XmlReader = require("xml-reader");

import {
  addCourseVideosByIdService,
  addRatingService,
  deleteCourseLinksIndexService,
  deleteCourseLinksService,
  deleteCourseService,
  getAllCoursesService,
  getCourseByIdService,
  getUserCoursesService,
  // searchControllerService,
  updateCourseLinksService,
} from "../services/course";
import { ExtraCourse } from "../Models/course";
import { storage } from "../firebase";
import { getDownloadURL, ref } from "firebase/storage";

export const Firebasefunc = async (filepath: string) => {
  const fileref = ref(storage, filepath);

  const urls = await getDownloadURL(fileref);
  if (urls) {
    return urls;
  } else {
    throw new Error("Enter write path for firebase");
  }
};
export const addCourseVideosById = async (ctx: any) => {
  try {
    const trailer = await Firebasefunc(ctx.request.body?.trailerUrl);
    const videoUrl = await Firebasefunc(ctx.request.body?.videoUrl);
    const id = ctx.request.params?.id;
    const superSubTitle = ctx.request.body?.superSubTitle;
    const index = ctx.request.body?.index;
    const subIndex = ctx.request.body?.subIndex;
    const subTitle = ctx.request.body?.subTitle;
    const extrafileIndex = ctx.request.body?.extrafileIndex;
    const extraLinksIndex = ctx.request.body?.extraLinksIndex;
    let extrafileUrl: string;
    let extraLinksUrl: string;
    if (ctx.request.body?.extrafileUrl) {
      extrafileUrl = await Firebasefunc(ctx.request.body?.extrafileUrl);
    }
    if (ctx.request.body?.extraLinksUrl) {
      extraLinksUrl = await Firebasefunc(ctx.request.body?.extraLinksUrl);
    }
    const obj: ExtraCourse = {
      id: uuidv4(),
      courseId: id,
      trailerUrl: trailer,
      superSubTitle,
      index,
      subIndex,
      subTitle,
      videoUrl: videoUrl,
      extrafileIndex,
      extraLinksIndex,
      extrafileUrl,
      extraLinksUrl,
    };
    const data = await addCourseVideosByIdService(obj);
    ctx.body = data;
    ctx.status = 202;
  } catch (err) {
    ctx.body = err;
    ctx.status = 404;
  }
};

export const getAllCourses = async (ctx: any) => {
  try {
    const pageNo: number = ctx.request.params.pageNo;
    const data = await getAllCoursesService(pageNo);
    ctx.body = data;
    ctx.status = 200;
  } catch (err) {
    ctx.body = err;
    ctx.status = 404;
  }
};

export const getCourseById = async (ctx: any) => {
  try {
    const courseId: any = ctx.request.params.id;
    const userId = ctx.state.userPayload.id;
    const data = await getCourseByIdService(courseId, userId);
    ctx.body = data;
    ctx.status = 202;
  } catch (err) {
    ctx.body = err;
    ctx.status = 404;
  }
};

export const addRating = async (ctx: any) => {
  try {
    const { id, rating } = ctx.request.params;
    const data = await addRatingService(id, rating);
    ctx.body = data;
  } catch (err) {
    ctx.body = err;
    ctx.status = 400;
  }
};

export const updateCourseLinks = async (ctx: any) => {
  try {
    if (
      !ctx.request.body?.trailerUrl.includes(
        "https://firebasestorage.googleapis.com"
      ) &&
      ctx.request.body?.trailerUrl
    ) {
      ctx.request.body.trailerUrl = await Firebasefunc(
        ctx.request.body?.trailerUrl
      );
    }
    if (
      !ctx.request.body?.videoUrl.includes(
        "https://firebasestorage.googleapis.com"
      ) &&
      ctx.request.body?.videoUrl
    ) {
      ctx.request.body.videoUrl = await Firebasefunc(
        ctx.request.body?.videoUrl
      );
    }
    if (
      !ctx.request.body?.extrafileUrl.includes(
        "https://firebasestorage.googleapis.com"
      ) &&
      ctx.request.body?.extrafileUrl
    ) {
      ctx.request.body.extrafileUrl = await Firebasefunc(
        ctx.request.body?.extrafileUrl
      );
    }
    if (
      !ctx.request.body?.extraLinksUrl.includes(
        "https://firebasestorage.googleapis.com"
      ) &&
      ctx.request.body?.extraLinksUrl
    ) {
      ctx.request.body.extraLinksUrl = await Firebasefunc(
        ctx.request.body?.extraLinksUrl
      );
    }
    const obj: ExtraCourse = {
      id: uuidv4(),
      courseId: ctx.request.body?.courseId,
      trailerUrl: ctx.request.body?.trailerUrl,
      superSubTitle: ctx.request.body?.superSubTitle,
      index: ctx.request.body?.index,
      subIndex: ctx.request.body?.subIndex,
      subTitle: ctx.request.body?.subTitle,
      videoUrl: ctx.request.body?.videoUrl,
      extrafileIndex: ctx.request.body?.extrafileIndex,
      extraLinksIndex: ctx.request.body?.extraLinksIndex,
      extrafileUrl: ctx.request.body?.extrafileUrl,
      extraLinksUrl: ctx.request.body?.extraLinksUrl,
    };
    await updateCourseLinksService(obj, ctx.request.params.id);
    ctx.body = { message: "Updated Successfully" };
  } catch (err: any) {
    ctx.body = { message: err };
    ctx.status = 400;
  }
};

export const deleteCourseLinksIndex = async (ctx: any) => {
  try {
    const index = ctx.request.params.index;
    const courseId = ctx.request.params.courseId;
    const subIndex = ctx.request.params.subIndex;
    const data = await deleteCourseLinksIndexService(index, subIndex, courseId);
    ctx.body = data;
  } catch (err) {
    ctx.status = 400;
    ctx.body = { message: err };
  }
};

export const deleteCourseLinks = async (ctx: any) => {
  try {
    const index = ctx.request.params.index;
    const courseId = ctx.request.params.courseId;
    const data = await deleteCourseLinksService(index, courseId);
    ctx.body = data;
  } catch (err: any) {
    ctx.status = 400;
    ctx.body = { message: err };
  }
};

export const deleteCourse = async (ctx: any) => {
  try {
    const courseId = ctx.request.params.courseId;
    const userId = ctx.state.userPayload.id;
    const data = await deleteCourseService(courseId, userId);
    ctx.body = data;
  } catch (err) {
    console.log(err);
    ctx.status = 404;
    ctx.body = { message: err };
  }
};

export const getUserCourses = async (ctx: any) => {
  try {
    const userId = ctx.state.userPayload.id;
    const data = await getUserCoursesService(userId);
    ctx.body = data;
  } catch (err) {
    ctx.status = 404;
    ctx.body = { message: err };
  }
};

// export const searchController=async(ctx:any)=>{
//     try{
//         const searchtext=ctx.request.params.searchByName;
//         const dataObj:any=await searchControllerService(searchtext)
//         let data:any;
//         let message;
//         if(dataObj){
//             data=dataObj
//             message=`searched ${searchtext}`
//         }
//         else{
//             data=[]
//             message="Not found"
//         }
//         ctx.body=data
//     }
//     catch(err:any){
//         ctx.status=400;
//         ctx.body=err
//     }
// }


export const fun1=(data:any,joker:any)=>{
  let batman:any={}
  let k:any={
    name:data.name,
    value:data?.children[0]?.value,
    parentName:data?.parent?.name
  }
  batman[data.name]=k
  if(joker[data?.parent?.name]){
    joker[data?.parent?.name].push(batman)
  }
  else{
    joker[data?.parent?.name]=[batman]
  }
  return joker
}
export const checkk = async (text: any) => {
  const reader = XmlReader.create();
  const xml: any = text;
  let res: any[]=[]
  let joker={}
  await reader.on("tag:label", (data: any) => {
    res.push(fun1(data,joker))
  });
  await reader.on("tag:value", (data: any) => {
    res.push(fun1(data,joker))
  });
  reader.parse(xml);
  return joker;
};

export const checkcc = async (ctx: any) => {
  let value =
    "PD94bWwgdmVyc2lvbj0iMS4wIj8+DQo8b29iZT4NCgk8b2VtZGF0YT4NCgkJPGNoZWNrYm94MT4NCgkJCTxsYWJlbD5Vc2UgbXkgaW5mb3JtYXRpb24gdG8gcmVnaXN0ZXIgbXkgTWNBZmVlIHNlY3VyaXR5IHN1YnNjcmlwdGlvbiwgcmVjZWl2ZSBzdWJzY3JpcHRpb24gZXhwaXJhdGlvbiBlbWFpbCByZW1pbmRlcnMgYW5kIGEgZGlnaXRhbCBzdWJzY3JpcHRpb24ga2V5IGNhcmQgdG8gcHJvdGVjdCBtdWx0aXBsZSBkZXZpY2VzLjwvbGFiZWw+DQoJCQk8dmFsdWU+dHJ1ZTwvdmFsdWU+DQoJCTwvY2hlY2tib3gxPg0KCQk8Y3VzdG9tZXJpbmZvPg0KCQkJPGxhYmVsPk15IGluZm9ybWF0aW9uIGlzIGNvcnJlY3QuPC9sYWJlbD4NCgkJCTx2YWx1ZT50cnVlPC92YWx1ZT4NCgkJPC9jdXN0b21lcmluZm8+DQoJPC9vZW1kYXRhPg0KPC9vb2JlPg0K";

  let buff = Buffer.from(value, "base64");
  let text = buff.toString("ascii");
  console.log(text);
  const data = await checkk(text);
  console.log(data);
  ctx.body=JSON.stringify(data)
};


// <?xml version="1.0"?>
// <oobe>
//     <oemdata>
//             <label>Use my information to register my McAfee security</label>
//                         <value>false</value>
//                         <label>Use my information to register my McAfee security</label>
//                         <value>true</value>
//                 <checkbox1>
//                         <label>Use my information to register my McAfee security subscription, receive subscription expiration email reminders and a digital subscription key card to protect multiple devices.</label>
//                         <value>true</value>
//                         <label>Use my information to register my McAfee security</label>
//                         <value>false</value>
//                         <label>McAfee security</label>
//                         <value>true</value>
//                 </checkbox1>
//                 <customerinfo>
//                         <label>My information is correct.</label>
//                         <value>true</value>
//                         <label>McAfee security1</label>
//                         <value>false</value>
//                         <label>McAfee security2</label>
//                         <value>true</value>
//                 </customerinfo>
//         </oemdata>
// </oobe>
