const actions = {
    GET_IMAGE:'GET_IMAGE',
    GET_IMAGE_SUCCESS:'GET_IMAGE_SUCCESS',
    GET_IMAGE_ERROR:'GET_IMAGE_ERROR',
    SET_IMAGE:'SET_IMAGE',
    UPLOAD_IMAGE:"UPLOAD_IMAGE",
    IMAGE_SUCCESS:"IMAGE_SUCCESS",
    IMAGE_ERROR:"IMAGE_ERROR",
    UPDATE_IMAGE:'UPDATE_IMAGE',
    getImageData:payload=>({
        type:actions.GET_IMAGE,
        payload
    }),
    uploadImage:payload =>({
      type:actions.UPLOAD_IMAGE,
      payload
    })

}

export default actions