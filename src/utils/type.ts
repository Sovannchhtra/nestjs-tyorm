
export type createUserParam = {
     username:string;
     password:string;
}

export type updateUserParam = {
     username:string;
     password:string;
}

export type createUserProfileParam ={
     firstName:string;
     lastName:string;
     age:number;
     dob:string;
}

export type createUserPostParam = {
     title:string;
     description:string;
}