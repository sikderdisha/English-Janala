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

newCard.innerHTML=`
<div class="bg-white rounded space-y-3 px-5 py-15 text-center">
    <h2 class="text-2xl font-bold">${word.word}</h2>
    <p class="hind-siliguri-ligh font-semibold text-[15px]">Meaning/Pronunciation</p>
    <div>
        <p class="break-words text-2xl font-medium">
   ${word.meaning}/${word.pronunciation}
</p>
        <div class="flex justify-between items-center pt-5">
           <button class="btn bg-[#e8f3fe] hover:bg-[#00BCFF]">
    <i class="fa-solid fa-circle-info"></i>
</button>

<button class="btn bg-[#e8f3fe] hover:bg-[#00BCFF]">
    <i class="fa-solid fa-volume-high"></i>
</button>
        </div>
    </div>

   </div>`;
   wordContainer.appendChild(newCard);
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