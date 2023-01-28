
let cl = console.log;
const backdrop = document.getElementById("backdrop");
const mymodal = document.getElementById("mymodal");
const showmodal = document.getElementById("showmodal");
const myClose = [...document.querySelectorAll('.myClose')];
const addmoviebtn = document.getElementById('addmoviebtn');
const moviecontainer = document.getElementById("moviecontainer");
const title = document.getElementById("title");
const imgurl = document.getElementById("imgurl");
const rating = document.getElementById("rating");
const updatemoviebtn = document.getElementById("updatemoviebtn");

let movieArray = [];
	// {
	// 	title : "Ved",
	// imgurl : ``,
	// 	rating : 5
	// },
	

function setMovieDataInStorage(){
	localStorage.setItem("setMovieInfo", JSON.stringify(movieArray));		//25)..setStdDataInStorage(arr)
}

// result = ``;
// movieArray.forEach(movie =>{
// 	result +=`

// 	`
// });

let getUpdateId = localStorage.getItem("updateId");


const onEditHandler = (ele) =>{   
	// cl("Editted", ele);
	let getId = ele.getAttribute("data-id");
	// cl(getId);  			
	localStorage.setItem("updateId", getId);		

	//how get uniq id
	// find out object from stdArray
	let getObj = movieArray.find(movie => movie.id === getId);			
	// cl(getObj);

	title.value = getObj.title;
	imgurl.value = getObj.imgurl;
	rating.value = getObj.rating;

	toggleModalHandler();
	
	addmoviebtn.classList.add('d-none');                 
	updatemoviebtn.classList.remove('d-none'); 			
}	

const onDeletehandler = (ele) =>{  
	// cl(ele);												
	// let deleteId = ele.getAttribute("data-id");				
					//OR
	let deleteId = ele.dataset.id						
	// cl(deleteId);
	let getIndex = movieArray.findIndex(movie => movie.id === deleteId);	
	movieArray.splice(getIndex, 1);
	// localStorage.setItem("setStdInfo", JSON.stringify(stdArray));
	setMovieDataInStorage();
	// cl(ele.parentElement.parentElement);
	ele.parentElement.parentElement.parentElement.parentElement.remove();
	// templating(movieArray);
}

function templating(arr){
	var result = ``;
	arr.forEach(movie =>{
		result +=	`
		
		<div class="col-sm-4">
			<div class="card mb-4 cardshow">
				<div class="card-header">
					<h3>${movie.title}</h3>
				</div>
				<div class="card-body">
					<figure>
						<img src="${movie.imgurl}" alt="${movie.title}" title="${movie.title}" class="movieImg">
					</figure>
				</div>
				
				<div class="card-footer footer">
					<div>
						<td>
							<button class="btn btn-info btne" data-id="${movie.id}" onclick="onEditHandler(this)"><i class="fa-solid fa-pen-to-square"></i></button>
						</td>
						<td>
							<button class="btn btn-danger" data-id="${movie.id}" onclick="onDeletehandler(this)"><i class="fa-solid fa-trash-can"></i></button>
						</td>
						<h5>
							${movie.rating} / 5
						</h5>
					</div>
					
				</div>
				
			</div>
		</div>`;
	
	});
	
	moviecontainer.innerHTML = result;
}
// templating(movieArray);

if(localStorage.getItem("setMovieInfo")){  
	movieArray = JSON.parse(localStorage.getItem("setMovieInfo"));
	templating(movieArray);
}



const toggleModalHandler = (e) => {
	mymodal.classList.toggle("show");
	backdrop.classList.toggle("show");
}


const onMovieaddHandler = (e) => {
	// cl("addd!!!!");
	e.preventDefault();
	let obj = {
		title : title.value,
		imgurl : imgurl.value,
		rating : rating.value,
		id :   uuid()
	}
	movieArray.unshift(obj);
	title.value = "";
	imgurl.value = "";
	rating.value = "";
	// cl(movieArray);


	
	toggleModalHandler();
	setMovieDataInStorage()
	templating(movieArray);

	
}



const onstdupdate = (e) =>{
	// cl("upadte!!!!!!!!!!!!");
	let getUpdateId = localStorage.getItem("updateId");	 
	// cl(getUpdateId);
	movieArray.forEach(movie =>{				
		if(getUpdateId === movie.id){
			movie.title = title.value;
			movie.imgurl = imgurl.value;
			movie.rating = rating.value;
		}
	})
	// localStorage.setItem("setStdInfo", JSON.stringify(stdArray));
	toggleModalHandler();
	setMovieDataInStorage();
	templating(movieArray);
	// movieform.reset();
	

	



	// subBtn.classList.remove('d-none'); 		
	// updateBtn.classList.add('d-none');
	
}







showmodal.addEventListener("click", toggleModalHandler);
myClose.forEach(ele => ele.addEventListener('click', toggleModalHandler));
backdrop.addEventListener("click", toggleModalHandler);
addmoviebtn.addEventListener("click", onMovieaddHandler);
updatemoviebtn.addEventListener("click", onstdupdate);



function uuid() {
	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	  var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	  return v.toString(16);
	});
  }



// const showModalHandler = (e) => {
// 	mymodal.classList.add("show");
// 	backdrop.classList.add("show");
// }

// const hideModalHandler = (eve) => {
// 	mymodal.classList.remove("show");
// 	backdrop.classList.remove("show");

// }

// showmodal.addEventListener("click", showModalHandler);
// myClose.forEach(ele => ele.addEventListener('click', hideModalHandler));
// backdrop.addEventListener("click", hideModalHandler);