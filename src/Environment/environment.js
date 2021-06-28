module.exports.api = 'http://localhost:8000/';
module.exports.bearer = () => { 
    if(localStorage.getItem('user-token')){
        return {headers: { Authorization: `Bearer ${localStorage.getItem('user-token')}`} }
    } else {
        return {}
    }
}


module.exports.dummy_posts = [{
    username: 'nenadmisic',
    user_profile_pic: 'https://www.mantruckandbus.com/fileadmin/_processed_/1/1/csm_man-holger-von-der-heide-interview-header_3dc7c2e575.jpg',
    image_link: 'https://plutonlogistics.com/cont/uploads/2016/05/man_240516-e1492874731172.jpg',
    description: 'best truck #lol #wow super truck #awesome',
    likes: 35,
    dislikes: 1432,
    comments: [
        {'username': 'milosradojcin', text: 'butiful truck you got there bro :)'}
    ]
},{
    username: 'milosradojcin',
    user_profile_pic: 'https://www.mantruckandbus.com/fileadmin/media/bilder/02_19/219_05_busbusiness_interviewHeader_1485x1254.jpg',
    image_link: 'https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0,176,3008,1654&wid=4000&hei=2200&scl=0.752',
    description: 'Beautiful nature alright #gas #gas #flower lol',
    likes: 3,
    dislikes: 0,
    comments: [
        {'username': 'nenadmisic', text: 'butiful nature you got there bro :)'}
    ]
},{
    username: 'milosradojcin',
    user_profile_pic: 'https://www.mantruckandbus.com/fileadmin/media/bilder/02_19/219_05_busbusiness_interviewHeader_1485x1254.jpg',
    image_link: 'https://cdn-prod.medicalnewstoday.com/content/images/articles/325/325466/man-walking-dog.jpg',
    description: 'man and dog #bff #cringe #dog #man #nature alright',
    likes: 255,
    dislikes: 132
}]