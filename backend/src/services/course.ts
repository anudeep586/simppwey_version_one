import knex from "../database/db";
import { v4 as uuidv4 } from "uuid";
import { ExtraCourse } from "../Models/course";

export const addCourseService = async (obj: any) => {
  const data = await knex("coursedetails").insert(obj).returning("*");
  if (data) {
    return data;
  } else {
    throw new Error("something wrong happen");
  }
};

export const addCourseVideosByIdService = async (obj: ExtraCourse) => {
  const data = await knex("courseLinks").insert(obj).returning("*");
  if (data) {
    return data;
  } else {
    throw new Error("something wrong happen");
  }
};

export const updateCourseLinksService = async (obj: ExtraCourse, courseId: string) => {
  const data = await knex("courseLinks")
    .where({ index: obj?.index, subIndex: obj?.subIndex, courseId: courseId })
    .update({
      trailerUrl: obj.trailerUrl,
      superSubTitle: obj.superSubTitle,
      index: obj.index,
      subIndex: obj.subIndex,
      subTitle: obj.subTitle,
      videoUrl: obj.videoUrl,
      extrafileIndex: obj.extrafileIndex,
      extraLinksIndex: obj.extraLinksIndex,
      extrafileUrl: obj.extrafileUrl,
      extraLinksUrl: obj.extraLinksUrl,
    })
    .returning("*");
  if (data) {
    return data;
  } else {
    throw new Error("something went wrong");
  }
};
export const getAllCoursesService = async (pageNo: number) => {
  const data = await knex("coursedetails")
    .join("courseLinks", "courseLinks.courseId", "coursedetails.id")
    .select("*")
    .limit(15)
    .offset(pageNo);

  let arr: any = {};
  data.map((course: any, key: any) => {
    if (arr?.[course.courseId]) {
      let check = course.courseId;
      const coursedata = {
        courseId: course?.courseId,
        trailerUrl: course?.trailerUrl,
        superSubTitle: course?.superSubTitle,
        index: course?.index,
        subIndex: course?.subIndex,
        subTitle: course?.subTitle,
        videoUrl: course?.videoUrl,
        extrafileIndex: course?.extrafileIndex,
        extraLinksIndex: course?.extraLinksIndex,
        extrafileUrl: course?.extrafileUrl,
        extraLinksUrl: course?.extraLinksUrl,
      };
      arr[check][0].coursedata.push(coursedata);
    } else {
      const insideData = {
        userdata: {
          id: course.id,
          userId: course?.userId,
          coupon: course?.coupon,
          price: course?.price,
          title: course?.title,
          categories: course?.categories,
          description: course?.description,
          imageUrl: course?.imageUrl,
          ratings: course?.ratings,
          techStack: course?.techStack,
          created_at: course?.created_At,
          updated_at: course?.update_at,
        },
        coursedata: [
          {
            courseId: course?.courseId,
            trailerUrl: course?.trailerUrl,
            superSubTitle: course?.superSubTitle,
            index: course?.index,
            subIndex: course?.subIndex,
            subTitle: course?.subTitle,
            videoUrl: course?.videoUrl,
            extrafileIndex: course?.extrafileIndex,
            extraLinksIndex: course?.extraLinksIndex,
            extrafileUrl: course?.extrafileUrl,
            extraLinksUrl: course?.extraLinksUrl,
          },
        ],
      };
      arr[course.courseId] = [insideData];
    }
  });
  if (data) {
    return arr;
  } else {
    throw new Error("something went wrong");
  }
};

export const getCourseByIdService = async (courseId: any,userId:string) => {
  let obj: any = {};
  let access;
  const data=await knex('coursestage').where({userId:userId,courseId:courseId,stage:"BUYED"}).select("*")
  if(data?.[0]){
    console.log(data)
    access=true
  }else{
    access=false
  }
  const getData = await knex("coursedetails")
    .join("courseLinks", "courseLinks.courseId", "coursedetails.id")
    .select("*")
    .where({ courseId: courseId });
  if (getData?.[0] !== undefined) {
    obj.data = [];
    obj.course = [];
    obj?.data.push({
      userId: getData?.[0]?.userId,
      price: getData?.[0]?.price,
      title: getData?.[0]?.title,
      categories: getData?.[0]?.categories,
      description: getData?.[0]?.description,
      imageUrl: getData?.[0]?.imageUrl,
      ratings: getData?.[0]?.ratings,
      techStack: getData?.[0]?.techStack,
      created_at: getData?.[0]?.created_at,
      updated_at: getData?.[0]?.updated_at,
      courseId: getData?.[0]?.courseId,
    });
    getData.map((course: any) => {
      obj?.course.push({
        trailerUrl: course?.trailerUrl,
        superSubTitle: course?.superSubTitle,
        index: course?.index,
        subIndex: course?.subIndex,
        subTitle: course?.subTitle,
        videoUrl: course?.videoUrl,
        extrafileIndex: course?.extrafileIndex,
        extraLinksIndex: course?.extraLinksIndex,
        extrafileUrl: course?.extrafileUrl,
        extraLinksUrl: course?.extraLinksUrl,
      });
    });
  }
  if (getData) {
    return {data:obj,access:access};
  } else {
    throw new Error("something went wrong");
  }
};

// (5*252 + 4*124 + 3*40 + 2*29 + 1*33) / (252+124+40+29+33) = 4.11 and change
export const addRatingService = async (id: string, rating: number) => {
  let oneStar = 0;
  let twoStar = 0;
  let threeStar = 0;
  let fourStar = 0;
  let fiveStar = 0;
  const data: any = await knex("ratings").where({ courseId: id }).select("*");
  if (data.length > 0) {
    oneStar = data.oneStar;
    twoStar = data.twoStar;
    threeStar = data.threeStar;
    fourStar = data.fourStar;
    fiveStar = data.fiveStar;
  }
  if (rating == 1) {
    oneStar = oneStar + 1;
  }
  if (rating == 2) {
    twoStar = twoStar + 1;
  }
  if (rating == 3) {
    threeStar = threeStar + 1;
  }
  if (rating == 4) {
    fourStar = fourStar + 1;
  }
  if (rating == 5) {
    fiveStar = fiveStar + 1;
  }
  console.log(oneStar, twoStar, threeStar, fourStar, fiveStar, data);
  let ratingsData: any;
  if (data.length === 0) {
    ratingsData = await knex("ratings")
      .insert({
        id: uuidv4(),
        courseId: id,
        oneStar,
        twoStar,
        threeStar,
        fourStar,
        fiveStar,
      })
      .select("*");
  } else {
    ratingsData = await knex("ratings")
      .where({ courseId: id })
      .update({ oneStar, twoStar, threeStar, fourStar, fiveStar })
      .returning("*");
  }
  let finalReview: number =
    (ratingsData.oneStar * 1 +
      ratingsData.twoStar * 2 +
      ratingsData.threeStar * 3 +
      ratingsData.fourStar * 4 +
      ratingsData.fiveStar * 5) /
    (ratingsData.oneStar +
      ratingsData.twoStar +
      ratingsData.threeStar +
      ratingsData.fourStar +
      ratingsData.fiveStar);
  // (5*252 + 4*124 + 3*40 + 2*29 + 1*33) / (252+124+40+29+33) = 4.11 and change
  console.log(ratingsData, "cool", finalReview);
  return finalReview.toFixed();
};


export const deleteCourseLinksIndexService=async(index:number,subIndex:number,courseId:string)=>{
    const data=await knex("courseLinks").where({courseId:courseId,index:index,subIndexx:subIndex}).del().returning("*");
    if(data){
        return {message:"deleted Successfully"}
    }
    else{
        throw new Error("Something went Wrong")
    }
}

export const deleteCourseLinksService=async(index:number,courseId:string)=>{
    const data=await knex("courseLinks").where({courseId:courseId,index:index}).del().returning("*");
    if(data){
        return {message:"deleted Successfully"}
    }
    else{
        throw new Error("Something went Wrong")
    }
}


export const deleteCourseService=async(courseId:string,userId:string)=>{
    const data=await knex("coursedetails").where({id:courseId,userId:userId}).del().returning("*");
    if(data){
        return {message:"deleted Successfully"}
    }
    else{
        throw new Error("Something went wrong")
    }
}


export const getUserCoursesService=async(userId:string)=>{
    const data = await knex("coursedetails")
    .join("courseLinks", "courseLinks.courseId", "coursedetails.id")
    .select("*").where({userId:userId})

  let arr: any = {};
  data.map((course: any, key: any) => {
    if (arr?.[course.courseId]) {
      let check = course.courseId;
      const index=[]
      const coursedata = {
        courseId: course?.courseId,
        trailerUrl: course?.trailerUrl,
        superSubTitle: course?.superSubTitle,
        index: course?.index,
        subIndex: course?.subIndex,
        subTitle: course?.subTitle,
        videoUrl: course?.videoUrl,
        extrafileIndex: course?.extrafileIndex,
        extraLinksIndex: course?.extraLinksIndex,
        extrafileUrl: course?.extrafileUrl,
        extraLinksUrl: course?.extraLinksUrl,
      };
      arr[check][0].coursedata.push(coursedata);
    } else {
      const insideData = {
        userdata: {
          id: course.id,
          userId: course?.userId,
          coupon: course?.coupon,
          price: course?.price,
          title: course?.title,
          categories: course?.categories,
          description: course?.description,
          imageUrl: course?.imageUrl,
          ratings: course?.ratings,
          techStack: course?.techStack,
          created_at: course?.created_At,
          updated_at: course?.update_at,
        },
        coursedata: [{
            courseId: course?.courseId,
            trailerUrl: course?.trailerUrl,
            superSubTitle: course?.superSubTitle,
            index: course?.index,
            subIndex: course?.subIndex,
            subTitle: course?.subTitle,
            videoUrl: course?.videoUrl,
            extrafileIndex: course?.extrafileIndex,
            extraLinksIndex: course?.extraLinksIndex,
            extrafileUrl: course?.extrafileUrl,
            extraLinksUrl: course?.extraLinksUrl,
          },
        ],
      };
      arr[course.courseId] = [insideData];
    }
  });
  if (data) {
    return arr;
  } else {
    throw new Error("something went wrong");
  }
}

