const dialog=document.getElementById('contentDialog');
const eyebrow=document.getElementById('dialogEyebrow');
const title=document.getElementById('dialogTitle');
const body=document.getElementById('dialogBody');

const collected={
  laurel:{eyebrow:'COLLECTED · 03.12.15',title:'Laurel Canyon, Los Angeles',image:'assets/images/laurel-canyon.jpg',text:'We lived in the same apartment as Jim Morrison, so we’d routinely wake up to find tourists taking pictures of our front door.'},
  alden:{eyebrow:'COLLECTED · 02.23.22',title:'Culver City, California',image:'assets/images/alden-balloon.jpg',text:'This selfie was taken by my then 4-year-old daughter on 2/23/22. The way the Valentine’s balloon hung above her head was beautiful in a way that I can’t put my finger on. We blew up the photo to nearly five feet, and it hangs in our hallway.'},
  chateau:{eyebrow:'COLLECTED · 08.17.14',title:'Chateau Marmont, West Hollywood',image:'assets/images/chateau-marmont.jpg',text:'The garden was encased in ivy. On Sunset, a few feet away, the city kept moving — you could barely hear it. Something about being there made you feel like you could do anything. And the fries were incredible.'},
  petros:{eyebrow:'COLLECTED · JULY 2026',title:'Chania, Crete',image:'assets/images/petros-chania.jpg',text:'While reflecting on the blockade of an Israeli cruise ship in 2025, Petros said, “Let them eat.”'},
  pereira:{eyebrow:'COLLECTED · 01.28.08',title:'Pereira, Colombia',image:'assets/images/pereira-colombia.jpg',text:'“There is nothing equivalent to the profound sadness of a life ended that’s been lived wasted.” That was the loose interpretation spoken by this farm worker while on a plantation tour in the outskirts of Pereira, Colombia. We were talking about the lifecycles of coffee beans. Reflection is a funny thing. You can see it everywhere when you’re looking.'},
  tokyo:{eyebrow:'COLLECTED · 11.17.09',title:'Ryōgoku Kokugikan, Tokyo',image:'assets/images/tokyo-sumo.jpg',text:'I visited Tokyo on a whim back when there would be weekly sale fares. I spent the morning in Tsukiji Market before attending a sumo competition in the afternoon.'}
};

function show(ey,ti,html){
  eyebrow.textContent=ey;
  title.textContent=ti;
  body.innerHTML=`<div class="dialog-inner">${html}</div>`;
  dialog.showModal();
}
function showCollected(item){
  show(item.eyebrow,item.title,`<img class="dialog-image" src="${item.image}" alt=""><p>${item.text}</p><div class="plaque">${item.eyebrow}<br>${item.title}</div>`);
}

document.querySelectorAll('[data-collected]').forEach(btn=>btn.addEventListener('click',()=>showCollected(collected[btn.dataset.collected])));
document.querySelector('.liir').addEventListener('click',()=>show('LIIR','Listen. Investigate. Identify. Resolve.',`<div class="liir-grid"><article><b>Listen</b><p>Deeply. Map the internal story, including what is said and what remains unsaid.</p></article><article><b>Investigate</b><p>Interrogate the external reality. Look past comfortable metrics and inherited explanations.</p></article><article><b>Identify</b><p>Locate the friction point where internal certainty and external reality collide.</p></article><article><b>Resolve</b><p>Build the action that clears the friction and gives the organization a way forward.</p></article></div>`));
document.querySelector('.red-dot').addEventListener('click',()=>show('THE RED DOT','Definitely a red dot.',`<p>At a leadership meeting, a slide came up: a sea of black, a few red dots scattered around the edge.</p><p>“Our goal,” the presenter said, “is to move the red dots into the middle.”</p><p>And I thought — oh. I’m definitely a red dot.</p><p>Three days later, a thousand leaders voted me among the most visionary people in the room.</p>`));
document.querySelector('.negroni').addEventListener('click',()=>show('THE DESK','The Negroni',`<p>One part gin. One part Campari. One part sweet vermouth.</p><p>Simple in design. Complex in taste.</p><p>As a good friend of mine, Brett Johnson, told me while he was writing on <em>Mad Men</em>: “Splurge on the vermouth.”</p>`));
document.querySelector('.notebook').addEventListener('click',()=>show('FROM THE DESK','Now what?',`<div class="note">The only question in life you always need an answer to is — now what?</div><p class="small">Also on the page: About That — like a child interrupting an adult conversation.</p>`));
document.querySelector('.workshop-note').addEventListener('click',()=>show('WORKSHOP','Ideas still baking',`<p><b>Nothing To See Here.</b> A product I launched, learned from, and would build differently today.</p><p><b>Tommy / LA28.</b> Strategy hiding inside culture, competition, and ritual.</p><p><b>City Local.</b> Reimagining a future for your take out.</p><p><b>Pharma strategists.</b> Every company should employ at least one. Hyper-regulated environments teach you to work to the letter and walk the edge of the line — a useful instinct in the age of AI, disclosures, privacy, and regulation.</p>`));
document.querySelector('.dino').addEventListener('click',()=>show('DINO','Chief of Snacks',`<p>Also IT.</p><p>Occasionally party planning.</p><p>Emergency squirrel response.</p>`));
document.querySelector('.feather').addEventListener('click',()=>show('OBSERVATION','Every story leaves something behind.',`<p>The useful part is often the thing everyone stepped over on the way out.</p>`));
document.querySelector('.door').addEventListener('click',()=>show('THE BOREDROOM','Yes, knock. We know.',`<p>We’re migrating to chat. For now, leave a message and I’ll get back to you.</p><p><a href="mailto:greg@gregorypohl.com">Leave a note →</a></p>`));

dialog.querySelector('.close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&dialog.open)dialog.close()});
