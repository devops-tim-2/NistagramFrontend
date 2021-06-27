import {api, bearer} from '../Environment/environment';

let mediaService = {
    upload_image: function (file, cb) {
        let url = `${api}media/`;
        let req = new XMLHttpRequest();
        let formData = new FormData();
        formData.append("image", file);     
        req.open("POST", url);

        req.onload = function () {
            var status = req.status;
            if (status == 200) {
                cb(`${url}${JSON.parse(req.response).image_path}`)
            } else {
                alert('failure')
            }
        };

        req.send(formData);
    },
};

export default mediaService;
