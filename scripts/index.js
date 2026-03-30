// data fetch
function loadData(){
    fetch("https://openapi.programming-hero.com/api/levels/all")
    .then(res => res.json())
    .then(data => display(data.data)); // ⚠️ important (data.data)
}
//load word
//it received the id of the levels
const loadWord=(id)=>{
    //console.log(id);
    const url =`https://openapi.programming-hero.com/api/level/${id}`; //dynamic url

    fetch(url)
    .then(res => res.json())
    .then(data => displayWord(data.data));
}

//display word
const displayWord=(words)=>{
    //get id
    const wordContainer =document.getElementById('wordContainer');

    wordContainer.innerHTML="";
//loop
    for(const word of words){
//create element
const newCard = document.createElement('div');
    }
}
// display
const display = (lessons) => {
    const lessonContainer = document.getElementById('buttons');
    lessonContainer.innerHTML = "";

    for(let lesson of lessons){
        console.log(lesson);

        const newContainer = document.createElement('div');

        // content add
        newContainer.innerHTML = `
           <button onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-info"><i class="fa-brands fa-leanpub"></i> Lesson-${lesson.level_no}</button>
        `;

        // append
        lessonContainer.appendChild(newContainer);
    }
};

loadData();