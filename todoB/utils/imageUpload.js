export const imageUpload = async(imageName,file)=>{
    return await file.mv(process.cwd()+'/images/'+imageName)
    .then((data)=>true)
    .catch(err=>{console.log(err);return false})
}