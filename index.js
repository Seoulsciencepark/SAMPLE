// 바로 아래에 있는 줄을 수정하면 전시물의 순서가 바뀜. 전시물의 순서에 대한 정보가 저장되어있음
const fullOrder= ['0-0-1@도르래','0-0-2@아르키메데스 운동 장치','0-0-3@정글짐 이용 안내']
//여기 아래로 절대 수정 금지!

const ROOT = "/SAMPLE"

var itemLength=fullOrder.length;
var itemList=[];
var nameList=[];

for (let i = 0; i < fullOrder.length; i++) {
  itm = fullOrder[i];
  splitedItm=itm.split('@');
  
  itemList.push(splitedItm[0]);
  nameList.push(splitedItm[1]);
}



function mod(number,modulo){
return (number%modulo+modulo)%modulo;

} 
//웹사이트 링크 수정해야함
const websiteLink="https://www.scsei.info/SAMPLE/index.html";
const textFileDirectory=ROOT+"/textfiles"
const audioFileDirectory=ROOT+"/mp3files"
const mainImageDirectory=ROOT+"/images"

// 브라우저의 URL 중 쿼리 파싱
//window.location.search는 url에서 ?부터끝까지의값(즉 쿼리 파싱))
//URLSearchParams는 쿼리 라이브러리같은거.

const urlParams = new URLSearchParams(window.location.search);



// (예시) 모든 쿼리 콘솔로 출력
//urlParams.entries()는 쿼리에 있는 key,value들을 iterator으로 리턴해줌
/*
for (const [key, value] of urlParams.entries()) {
console.log(`키 $${key} 값은 ${value} 입니다.`);
}
*/

// 전시물 (item) 번호를 찾아오기
//urlParams.get("key")Returns the first value associated with the given search parameter.
const itemNo = urlParams.get("item");
const lang = urlParams.get("lang");



//이상한점 itemText 따로 정의 안해도 사용 가능함 
//텍스트로드

itemText.src=textFileDirectory+"/"+itemNo+lang+".txt";

var index=itemList.indexOf(itemNo);






// 다음 페이지와 이전 페이지

//const nextLink = document.getElementById("next");
//nextLink.href=websiteLink+"?item="+itemList[mod(index+1,itemLength)]+'&lang='+lang;

//const previousLink = document.getElementById("previous");
//previousLink.href=websiteLink+"?item="+itemList[mod(index-1,itemLength)]+'&lang='+lang;

//언어 변경

//const englishLink = document.getElementById("english");
//englishLink.href=websiteLink+"?item="+itemList[index]+'&lang=eng';

//const koreanLink = document.getElementById("korean");
//koreanLink.href=websiteLink+"?item="+itemList[index]+'&lang=kor';



var txtText = '';
var frame = document.getElementById('itemText');
frame.onload = function () {
var body = frame.contentWindow.document.querySelector('body');
txtText = body.innerHTML;




var mainText=document.getElementsByClassName('mainText');
mainText[0].innerHTML = txtText;

};


let otherLang;
if (lang === "eng") {
  otherLang = "kor";
} else {
  otherLang = "eng"; // Fallback if lang is not "eng"
}

const langLink1 = document.getElementById("lang-link1");
langLink1.href=websiteLink+"?item="+itemList[index]+'&lang='+otherLang;

//오디오로드
const audioPlayer = document.getElementById("audio")
audioPlayer.src= audioFileDirectory+"/"+itemNo+lang+".mp3"


//이미지로드
const firstImage = document.getElementById("first-image")
firstImage.src= mainImageDirectory+"/"+itemNo+lang+"first"+".png"



// 다음 페이지와 이전 페이지

const nextLink = document.getElementById("next_nav");
nextLink.href=websiteLink+"?item="+itemList[mod(index+1,itemLength)]+'&lang='+lang;

const previousLink = document.getElementById("prev_nav");
previousLink.href=websiteLink+"?item="+itemList[mod(index-1,itemLength)]+'&lang='+lang;

//스크롤


// script.js

document.addEventListener('scroll', () => {
  const overlay = document.querySelector('.overlay');
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;

  // Calculate the new position of the overlay based on the scroll position
  let newHeight = 50+(scrollPosition / windowHeight) * 100;
  overlay.style.height = `${newHeight}vh`

});

const scrollDiv = document.getElementById('scrollable-div');
const scrollValue = document.getElementById('scroll-value');

// Add an event listener to track the scroll event
scrollDiv.addEventListener('scroll', () => {
  // Get the scrollTop value to see how far down the scroll bar is
  const scrollPosition = scrollDiv.scrollTop;

  const overlay = document.querySelector('.overlay');
  const windowHeight = window.innerHeight;

  // Calculate the new position of the overlay based on the scroll position
  let newHeight = window.innerHeight/2+scrollPosition/2
  overlay.style.height = `${newHeight}px`

});


