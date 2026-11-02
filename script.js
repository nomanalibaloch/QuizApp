const startBtn=document.querySelector('.start-btn');
const nextBtn=document.querySelector('.next');
const question=document.querySelector('.question');
const questionTab=document.querySelector('.question-tab');
const startTab=document.querySelector('.start-tab');
const questionChoice=document.querySelector('.question-choice');
const currentQuestionNumber=document.querySelector('.quest-no');
const actualTime=document.querySelector('.time');
const allQuestions=Array.from(questionChoice.children);
// Assuming you have 'correct.mp3' and 'wrong.mp3'
const rightSound=new Audio("correct.mp3"); 
const wrongSound=new Audio("wrong.mp3");
const score=document.querySelector('.score');
const music=document.querySelector('.music-logo');
// Assuming you have 'audio.mp3'
let myAudio = new Audio('audio.mp3'); 
const correctAns=document.createElement('span');
const wrongAns=document.createElement('span');
const seconds=document.querySelector('.seconds');
const result=document.querySelector('.result');
const childDiv=document.querySelector('.child-div');
const correctPercentage=document.querySelector('.correct-value');
const inCorrectPercentage=document.querySelector('.incorrect-value');
const retryBtn=document.querySelector('.retry-btn');
const body=document.querySelector('body'); // Defined body globally for color changes

wrongAns.innerHTML="&#10006;";
wrongAns.classList.add('wrong');
correctAns.innerHTML="&#10003;";
correctAns.classList.add('tick');
myAudio.volume = 0.5;

let index;
let totalTime;
let valueSelected=false;
const totalQuestions = 160; // *** UPDATED TO 120 QUESTIONS ***
let wholevalue; 

function finalize(){
    // Updated calculation to use the correct totalQuestions count (120)
    let percent=parseInt((correctAnswer/totalQuestions)*100); 
    let inPer=100-percent;
    childDiv.style.width=`${percent}%`;
    correctPercentage.innerText=percent+"%";
    inCorrectPercentage.innerText=inPer+"%";
}
function changeBackgroundColor(x,color){
    x.style.backgroundColor=color;
}
function changeColor(x,color){
    x.style.color=color;
}
music.addEventListener('click',()=>{
    // Toggle music playback and icon
    if(myAudio.paused){ 
        music.innerHTML="&#119189;" // Music Note
        myAudio.play();
    }
    else{
        music.innerHTML="&#119188;"; // Mute Note
        myAudio.pause();   
    }
})

let count;
let correctAnswer=0;
let questionNumber;

// Local storage logic for resuming quiz
let myData=JSON.parse(localStorage.getItem("myData")) || {};
if(myData.count && myData.questionNumber){
    // Reset if previous quiz was completed or near completion
    if(myData.count >= totalQuestions - 1){ 
        myData.count=-1;
        myData.questionNumber=1;
    }
}
else{
    myData.count=-1;
    myData.questionNumber=1;
}

count=myData.count;
questionNumber=myData.questionNumber;

function timer(){
    wholevalue=30;
    let time=setInterval(()=>{
        seconds.innerText=wholevalue.toString().padStart(2, '0'); // Add leading zero for better display
        
        // Color changes based on time remaining
        if(wholevalue==30){
            changeBackgroundColor(body,"#CCE2C2")
            changeBackgroundColor(actualTime,"#02A409")
            changeBackgroundColor(nextBtn,"#CCE2C2") // Corrected color code
            changeColor(nextBtn,"#02A409") // Next button text color for first 15 seconds
        }
        if(wholevalue===0){
            clearInterval(time);
            nextBtn.click(); // Automatically move to next question
        }
        else if(wholevalue==15){
            changeBackgroundColor(body,"#D4D69F")
            changeBackgroundColor(actualTime,"#C5B100")
            changeBackgroundColor(nextBtn,"#D4D69F")
            changeColor(nextBtn,"#C58800")
        }
        else if(wholevalue==5){
            changeBackgroundColor(body,"#DBADAD");
            changeBackgroundColor(nextBtn,"#DBADAD")
            changeBackgroundColor(actualTime,"#C50C00 ");
            changeColor(nextBtn,"#C50C00")
        }
        wholevalue--;
    },1000)
    return time;
}

// ----------------------------------------------------------------------
// FULL QUIZ DATA (120 IYCF Questions)
// ----------------------------------------------------------------------
const data = {
    question: [
        // Section I: Original 60 Questions (Breastfeeding, CF, Policy)
        "What is the World Health Organization (WHO) and UNICEF recommendation for the initiation of breastfeeding?",
        "Exclusive Breastfeeding is defined as giving an infant only breast milk, with no additional food or drink, not even water, for how long?",
        "The first milk produced by the mother after delivery is known as:",
        "Which hormone is primarily responsible for the production (making) of breast milk?",
        "Which hormone is primarily responsible for the milk ejection (let-down) reflex?",
        "How long does the WHO/UNICEF recommend continued breastfeeding alongside appropriate complementary foods?",
        "The watery milk that comes at the start of a feed, which is high in volume and lactose, is called:",
        "The thicker milk that comes at the end of a feed, which is rich in fat and provides satiety, is called:",
        "Which immunoglobulin is most abundant in breast milk and provides passive immunity to the infant?",
        "What is the minimum recommended feeding frequency for an exclusively breastfed newborn in 24 hours?",
        "A good latch during breastfeeding is characterized by:",
        "In the context of breastfeeding, what does 'feeding on demand' mean?",
        "What is a common practice that can interfere with the establishment of exclusive breastfeeding?",
        "The practice of keeping the mother and baby together in the same room 24 hours a day is known as:",
        "What is the most significant benefit of breastfeeding for the mother?",
        "Which of the following is considered a contraindication (absolute reason not to breastfeed) in Pakistan for a mother?",
        "Breast milk provides approximately what percentage of a child's energy needs between 6 and 12 months of age?",
        "What is the primary benefit of skin-to-skin contact immediately after birth?",
        "When should a mother with a breast lump, sore nipple, or engorgement seek help?",
        "The Baby-Friendly Hospital Initiative (BFHI) is a global effort to implement the Ten Steps to Successful Breastfeeding. How many steps are there?",
        "What is the recommended way to soothe a baby who is crying shortly after a feed?",
        "What is the greatest risk of using a pacifier or artificial nipple in the early weeks?",
        "Which nutrient in breast milk provides anti-infective properties?",
        "A mother who is exclusively breastfeeding can rely on the Lactational Amenorrhea Method (LAM) for family planning if:",
        "Mastitis is an infection of the breast tissue. What is the recommended management for a mother with mastitis?",
        "Which of the following is not a sign that a baby is getting enough milk?",
        "After 6 months, how much of a child's energy needs does complementary food provide (approximate proportion)?",
        "The WHO and UNICEF emphasize the critical importance of breastfeeding for:",
        "What is the major nutritional difference between breast milk and cow's milk for an infant under 1 year?",
        "A mother needs to express her milk at work. What is the generally safe storage duration for fresh expressed breast milk at room temperature (25\u00b0C) in a clean container?",
        "At what age should nutritionally adequate and safe complementary foods be introduced?",
        "The process of introducing a baby to solid, semi-solid, or soft foods while continuing to breastfeed is called:",
        "What is the recommended frequency for offering complementary meals to a breastfed child aged 6-8 months?",
        "What is the recommended frequency for offering complementary meals and snacks to a breastfed child aged 9-23 months?",
        "The consistency of complementary foods introduced at 6 months should initially be:",
        "Dietary diversity in complementary feeding is defined as a child consuming foods from how many food groups in the previous day?",
        "Which of the following is considered an important food group for complementary feeding to ensure adequate iron intake?",
        "The main public health concern with complementary feeding in many low-income settings, including parts of Pakistan, is:",
        "Responsive feeding practices include all of the following except:",
        "When an infant is sick, what adjustment should be made to their feeding?",
        "What is the risk associated with introducing complementary foods too early (before 6 months)?",
        "What is the risk associated with introducing complementary foods too late (after 6 months)?",
        "Which vitamin is often deficient in the diets of infants who are not exclusively breastfed and do not receive fortified foods in low-income settings?",
        "When preparing complementary foods, what is a crucial hygiene practice to prevent diarrhea?",
        "The term 'Minimum Acceptable Diet' (MAD) is a composite indicator of:",
        "For a non-breastfed child aged 6-23 months, what is the minimum recommended meal frequency (including solid, semi-solid, or soft foods and milk feeds)?",
        "What type of food should be avoided in complementary feeding for infants and young children?",
        "A healthy, term baby's iron stores are typically sufficient for how long?",
        "What is the recommended way to transition food texture as the child grows from 6-12 months?",
        "Who is primarily responsible for promoting and supporting optimal IYCF practices at the community level in Pakistan?",
        "The International Code of Marketing of Breast-milk Substitutes was adopted by the World Health Assembly in which year?",
        "The primary purpose of the International Code is to:",
        "In Pakistan, the law regulating the marketing of breast-milk substitutes and related products is the:",
        "The core IYCF indicator that measures the proportion of infants aged 0-5 months who received only breast milk is:",
        "In the context of nutrition, stunting refers to a child who is:",
        "In the context of nutrition, wasting refers to a child who is:",
        "Which deficiency is the most common cause of preventable mental retardation and brain damage worldwide, often addressed through maternal/infant supplementation and fortification?",
        "What is the single most effective intervention to reduce under-five mortality, potentially preventing over 820,000 child deaths globally each year?",
        "The recommended IYCF practice to help an infant transition from a cup to drinking independently is:",
        "What is the correct term for the period covering pregnancy through the child's second birthday, considered the most critical period for nutrition?",
        
        // Section II: Additional 60 Questions
        "Newborns should ideally be put to breast within how long after birth?",
        "Exclusive breastfeeding means the infant receives:",
        "WHO recommends exclusive breastfeeding until approximately:",
        "Which is NOT a component of colostrum?",
        "The main principle that controls milk production is:",
        "A normal newborn feeding frequency in the first month is approximately:",
        "The recommended minimum duration to continue breastfeeding alongside complementary foods is:",
        "Which infant condition is an absolute contraindication to breastfeeding?",
        "Which maternal condition is a reason to avoid breastfeeding?",
        "Best action when mother has cracked, painful nipples:",
        "The “baby-led” cue that suggests correct attachment includes:",
        "Effective milk transfer is best measured by:",
        "Mastitis is best described as:",
        "Recommended management of mastitis (non-abscess):",
        "Engorgement usually occurs:",
        "Correct positioning and attachment will help prevent:",
        "Signs that breastfeeding is going well in the first week include:",
        "“Cluster feeding” in newborns means:",
        "A usual early breastfeeding problem is:",
        "When a baby is sleepy and not feeding well, best initial action is:",
        "Expressed breastmilk can be stored in a refrigerator (4°C) for how long safely (general guidance)?",
        "Hand expression of milk is useful when:",
        "The correct technique to manage a blocked milk duct includes all EXCEPT:",
        "Pacifier use in early weeks may:",
        "“Baby-friendly” hospital initiative (BFHI) supports which practice?",
        "Which is a key counseling skill for breastfeeding support?",
        "A mother with HIV in a low-resource setting should:",
        "Breastfeeding protects infants against:",
        "Which maternal medication is generally a contraindication to breastfeeding?",
        "The main immunoglobulin in breastmilk protecting mucosal surfaces is:",
        "A “prelacteal feed” means:",
        "For low birthweight or preterm infants, feeding support should include:",
        "How does maternal smoking affect breastfeeding?",
        "“Relactation” refers to:",
        "Signs of adequate infant intake include:",
        "A mother reports the baby is not gaining enough. First step for assessment:",
        "Sore nipples are most commonly due to:",
        "Management of inverted nipples to aid breastfeeding includes:",
        "Use of pacifiers during establishment of breastfeeding is:",
        "A mother with active, untreated pulmonary tuberculosis should:",
        "Which statement about exclusive breastfeeding and water is correct?",
        "How to store expressed breastmilk in a freezer (general safe guidance)?",
        "Which is a benefit of skin-to-skin contact after birth?",
        "Correct sequence for a breastfeeding assessment:",
        "When should complementary foods be introduced?",
        "“Minimum acceptable diet” for a breastfed child combines:",
        "For a baby with tongue-tie causing feeding problems, initial management is:",
        "Which is TRUE about formulas in low-resource settings?",
        "The primary hormone responsible for milk ejection (let-down) is:",
        "The primary hormone responsible for milk synthesis (prolactin effect) is:",
        "Early signs of breast infection (mastitis) include:",
        "Which is an important community-level action to support breastfeeding?",
        "For a mother returning to work, helpful measures include:",
        "In emergencies (floods, displacement), IYCF guidance emphasizes:",
        "“Wet nursing” means:",
        "Which is a sign of poor attachment at breast?",
        "Correct first step when baby chokes in breastfeed but is coughing:",
        "Skin conditions in mother (e.g., eczema) are:",
        "Breast milk composition changes over a feed: the milk at the end (hindmilk) is:",
        "The best method to measure infant intake when transfer is doubtful but baby breastfeeding is possible:",
        "If a mother says “I don’t have enough milk,” best first response is:",
        "“Exclusive pumping” means:",
        "The most important prevention for nipple damage is:",
        "Cup/syringe feeding is recommended when:",
        "Mothers with hepatitis B infection: breastfeeding is:",
        "Maternal alcohol intake: recommended action for breastfeeding mothers is:",
        "Which method is best to help a mother with oversupply causing uncomfortable breasts and fast let-down?",
        "A breast abscess requires:",
        "If a mother has low milk supply due to insufficient removal, recommended approach:",
        "Which statement about complementary feeding is TRUE?",
        "Which of the following increases the risk of early cessation of breastfeeding?",
        "Growth faltering in a breastfed infant prompts you to:",
        "Which nutrient in breastmilk is uniquely high and helps protect against infection?",
        "Use of nipple shields should be:",
        "Who should be part of a multidisciplinary approach to support breastfeeding in a hospital?",
        "Which feeding method for newborns unable to latch but with maternal milk available is recommended?",
        "Which is TRUE regarding breastfeeding and maternal nutrition?",
        "If a mother is on short course of antibiotics for mastitis, breastfeeding:",
        "Which of the following is an early newborn feeding cue?",
        "The role of community health workers in IYCF includes:",
        "Which statement about formula marketing is correct per IYCF policy?",
        "For an infant with vomiting and suspected dehydration, breastfeeding management is:",
        "Which developmental sign suggests baby ready for complementary food?",
        "Which is NOT a function of human milk oligosaccharides (HMOs)?",
        "If a mother is using substances of abuse, the recommended action is:",
        "What is “rooming-in”?",
        "Which breastfeeding practice reduces risk of ear infections in infants?",
        "How should complementary foods be prepared for safety?",
        "Which is an indicator of successful IYCF program at community level?",
        "When should a clinician refer a breastfed baby for further medical assessment?",
        "Which statement is correct about breastfeeding and immunization?",
        "Counseling a mother about return to fertility and contraception while breastfeeding:",
        "If a baby has oral thrush (candida) and painful feeds, best management:",
        "Which measure helps protect breastfeeding in workplaces?",
        "The role of fathers and family in breastfeeding support includes:",
        "Which is TRUE about milk “let-down” problems?",
        "For HIV-exposed infants, national policy (varies by country) generally emphasizes:",
        "Which of these is a community barrier to breastfeeding that programs often address?",
        "The single most important feeding intervention for reducing infant mortality in many settings is:",
        "When documenting breastfeeding in a medical chart, important items to note include:"
    ],
    choice: [
        // Section I: Original 60 Choices
        ["Within 6 hours of birth", "Within 24 hours of birth", "Within the first hour of birth", "After the mother is fully rested"], 
        ["First 4 months of life", "First 6 months of life", "First 1 year of life", "First 2 years of life"], 
        ["Mature Milk", "Foremilk", "Colostrum", "Hindmilk"], 
        ["Oxytocin", "Prolactin", "Estrogen", "Progesterone"], 
        ["Prolactin", "Oxytocin", "Adrenaline", "Thyroxine"], 
        ["Up to 1 year", "Up to 18 months", "Up to 2 years", "Up to 2 years or beyond"], 
        ["Colostrum", "Foremilk", "Hindmilk", "Transitional Milk"], 
        ["Colostrum", "Foremilk", "Hindmilk", "Mature Milk"], 
        ["IgE", "IgM", "IgG", "IgA"], 
        ["4-6 times", "8-12 times", "6-8 times", "12-16 times"], 
        ["The baby only sucking on the nipple tip", "Audible clicking or smacking sounds", "The baby having a mouth full of areola and a wide-open mouth", "Pain in the mother’s nipple throughout the feed"], 
        ["Following a strict 3-hour schedule", "Feeding only when the mother’s breasts feel full", "Feeding whenever the baby shows hunger cues", "Feeding only during daylight hours"], 
        ["Skin-to-skin contact", "Rooming-in", "Giving pre-lacteal feeds (e.g., honey, sugar water)", "Feeding on demand"], 
        ["Early Initiation", "Demand Feeding", "Rooming-in", "KMC (Kangaroo Mother Care)"], 
        ["Better sleep", "Reduced risk of breast and ovarian cancer", "Increased fertility", "Guaranteed post-partum weight loss"], 
        ["Tuberculosis (on treatment)", "Hepatitis C", "Mastitis", "Maternal HIV in settings where replacement feeding is acceptable, feasible, affordable, sustainable, and safe (AFASS)"], 
        ["Less than 10%", "25%", "Half or more (50%+)", "Nearly 100%"], 
        ["To stimulate meconium passage", "To increase mother's body temperature", "To regulate the newborn's temperature and facilitate early latching", "To perform the Apgar score"], 
        ["Only if she gets a fever", "After a few weeks", "Immediately from a health worker or lactation consultant", "Never, as it is a normal part of breastfeeding"], 
        ["5", "10", "12", "20"], 
        ["Immediately offer a bottle of formula", "Give plain water", "Offer the breast again or try non-nutritive sucking (comfort)", "Give a pacifier"], 
        ["Dental issues", "Choking hazard", "Nipple confusion and poor latch establishment", "Lower IQ"], 
        ["Carbohydrates", "Fat", "Minerals", "White blood cells and antibodies (Immunoglobulins)"], 
        ["Her baby is 12 months old or less", "She has started using complementary foods", "Her baby is less than 6 months old, she is amenorrheic (no menses), and she is exclusively breastfeeding", "She has only had one child"], 
        ["Stop breastfeeding completely", "Continue breastfeeding frequently from the affected breast, use warm compresses, and take prescribed antibiotics", "Switch to formula until the infection clears", "Only breastfeed from the unaffected breast"], 
        ["Passing 6 or more wet, pale-yellow diapers in 24 hours (after day 5)", "At least 1-2 soft or liquid stools per day (first month)", "The baby cries continuously after every feed and is not gaining weight", "The baby seems satisfied and sleeps well after most feeds"], 
        ["80% or more", "Around 50%", "Less than 10%", "75%"], 
        ["Reducing the burden of respiratory illnesses", "Reducing the risk of diarrheal diseases", "Improving cognitive development", "All of the above"], 
        ["Breast milk has a higher fat content", "Cow's milk has a much higher protein and mineral content, which can stress a baby's kidneys", "Cow's milk is richer in Vitamin C", "Breast milk has more Vitamin K"], 
        ["Up to 2 hours", "Up to 4 hours", "Up to 8 hours", "Up to 12 hours"],
        ["4 months", "5 months", "6 months", "9 months"],
        ["Exclusive Breastfeeding", "Weaning", "Complementary Feeding", "Mixed Feeding"],
        ["1 meal per day", "2-3 meals per day", "3-4 meals per day", "5 or more meals per day"],
        ["2 meals + 1 snack", "3-4 meals + 1-2 snacks", "5 meals with no snacks", "2 meals with no snacks"],
        ["Hard solids (e.g., biscuits)", "Whole fruit pieces", "Pureed, mashed, or semi-solid", "Thin, watery gruels"],
        ["At least 3", "At least 5", "At least 7", "At least 10"],
        ["Vitamin A rich fruits/vegetables", "Cereals and grains", "Flesh foods (meat, poultry, fish) or iron-fortified cereals", "Pulses and nuts"],
        ["Too much protein", "Low energy density, poor nutrient density, and low meal frequency", "Too many expensive, processed foods", "Over-consumption of breast milk"],
        ["Encouraging the child to eat but not forcing", "Feeding slowly and patiently", "Minimizing distractions during meal times", "Feeding the child based only on the clock schedule"],
        ["Stop breastfeeding and give only water", "Increase fluid intake, including more frequent breastfeeding, and offer soft, favourite foods", "Offer only formula", "Severely restrict all food intake"],
        ["Increased risk of obesity", "Increased risk of infections (diarrhea) and reduced breast milk intake/production", "Increased risk of allergy", "Too much weight gain"],
        ["Poor mother-child bonding", "Increased risk of infections", "Increased risk of malnutrition/nutritional deficiencies (especially iron and zinc)", "Decreased cognitive development"],
        ["Vitamin C", "Vitamin A and Iron", "Vitamin E", "Vitamin K"],
        ["Adding extra sugar to the food", "Cooking the food for a very short time", "Washing hands with soap and safe water before preparing and feeding", "Storing cooked food at room temperature for over 4 hours"],
        ["Minimum meal frequency only", "Minimum dietary diversity only", "Minimum meal frequency and minimum dietary diversity", "Consumption of iron-rich foods only"],
        ["2-3 times per day", "4 times per day or more", "5 times per day", "Twice per day"],
        ["Iron-rich foods", "Soft-cooked vegetables", "Foods with minimal nutritional value, like sugary drinks and excessive salt", "Pulses and legumes"],
        ["3 months", "6 months", "9 months", "12 months"],
        ["Pureed only for 6-12 months", "Gradually moving from pureed/mashed to thicker mashed, then lumpy and chopped/finger foods", "Immediately switching to adult foods at 6 months", "Only providing liquids"],
        ["Doctors in tertiary hospitals", "School teachers", "Lady Health Workers (LHWs)", "Local government officials"],
        ["1978", "1981", "1990", "2005"],
        ["Ban the sale of all infant formula", "Protect and promote breastfeeding by regulating the marketing of breast-milk substitutes", "Mandate free formula distribution in emergencies", "Control the price of infant formula globally"],
        ["Food Safety Act", "The Protection of Breastfeeding and Child Nutrition Ordinance, 2002", "Public Health Act", "Trade Mark Ordinance"],
        ["Early Initiation of Breastfeeding", "Continued Breastfeeding", "Minimum Acceptable Diet", "Exclusive Breastfeeding"],
        ["Too thin for their height (Wasting)", "Overweight for their height", "Too short for their age (Chronic Malnutrition)", "Underweight for their age"],
        ["Too short for their age", "Too thin for their height (Acute Malnutrition)", "Overweight for their height", "Underweight for their age"],
        ["Zinc deficiency", "Iron deficiency", "Iodine deficiency", "Vitamin D deficiency"],
        ["Vaccination", "Handwashing with soap", "Optimal Breastfeeding (Exclusive BF for 6 months, continued for 2 years or beyond)", "Improved sanitation"],
        ["Using a feeding bottle for better control", "Teaching them to drink from an open cup starting at 6 months", "Using a sippy cup with a valve", "Skipping liquids until age 1"],
        ["The First 100 Days", "The First Two Years", "The First 1,000 Days", "The Golden 5 Years"],
        
        // Section II: Additional 60 Choices
        ["Within 24 hours", "Within 6 hours", "Within 1 hour", "After 48 hours"],
        ["Breastmilk and water only", "Breastmilk only (no other food or drink, except medicines)", "Breastmilk and formula occasionally", "Breastmilk and fruit juices"],
        ["3 months", "6 months", "9 months", "12 months"],
        ["High antibodies (IgA)", "High fat proportion compared to mature milk", "High protein and immune cells", "Laxative effect to clear meconium"],
        ["Mother’s calorie intake only", "Supply and demand (removal stimulates production)", "Fixed daily hormone cycle", "Infant weight alone"],
        ["1–2 feeds/day", "3–4 feeds/day", "8–12 feeds/day (on demand)", "Only at night"],
        ["6 months", "12 months", "2 years or beyond", "5 years"],
        ["Infant with simple jaundice", "Infant with classic galactosemia", "Infant with low birth weight", "Infant with congenital heart disease"],
        ["Mild common cold", "Tuberculosis (if mother is untreated — temporary precautions)", "Infant with galactosemia", "Most routine maternal infections (breastfeeding usually continues)"],
        ["Stop breastfeeding and give formula immediately", "Continue frequent correct positioning and latch; treat nipple if needed", "Only express milk by pump forever", "Give water to baby instead"],
        ["Shallow latch and only nipple in mouth", "Wide open mouth, lower lip turned out, more areola visible above than below", "Baby sleeping at breast all the time", "No audible swallowing"],
        ["Baby’s weight gain over time and audible swallowing during feeds", "Time spent at breast only", "Mother’s breast size", "Number of wet diapers only"],
        ["Blocked milk duct only, never with infection", "Inflammation of breast tissue; may be with infection and systemic symptoms", "Always requires immediate weaning", "A psychological condition only"],
        ["Immediate weaning and stop breastfeeding from affected side only", "Continue breastfeeding frequently, ensure emptying; seek antibiotics if systemic signs", "Pump and discard milk forever", "Use formula feed while giving antibiotics to mother"],
        ["1–3 days postpartum when milk comes in and breasts are full", "Only after 6 months", "Only with formula feeding", "Not related to milk supply"],
        ["Nipple trauma/cracking", "Low milk supply always (indirectly can help)", "Blocked ducts", "All of the above"],
        ["Rapid weight loss >10%", "6–8 wet diapers/day and steady weight gain after first week", "No wet diapers for 24 hours", "Continuous crying after feeds only"],
        ["One long feed only at night", "Several feeds close together in a short period — normal behavior", "Baby refuses feedings completely", "Feeding only every 6 hours"],
        ["Infant refusing bottle completely (always problem)", "Poor latch leading to nipple pain and inadequate transfer", "Excess milk in all mothers always", "None of the above"],
        ["Wake baby and encourage feeding frequently; skin-to-skin contact to stimulate", "Give formula immediately", "Wait 24 hours then try", "Start solids"],
        ["24 hours", "3–5 days", "2 weeks", "1 month"],
        ["Mother cannot access pump", "Early postpartum (colostrum) and for relieving engorgement", "For feeding small preterm infants by cup/syringe", "All of the above"],
        ["Frequent breastfeeding or expression from the affected breast", "Gentle massage toward the nipple during feeds", "Applying heat before feeding and cold after if painful", "Abrupt cessation of breastfeeding from the affected breast for weeks"],
        ["Improve breastfeeding success always", "Potentially interfere with establishing breastfeeding if introduced too early", "Be required to prevent SIDS only", "Replace night feeds safely"],
        ["Routine supplementation with formula for all babies", "Skin-to-skin contact and early initiation of breastfeeding", "Delayed first breastfeeding until 24 hours", "Routine separation of mother and baby"],
        ["Lecturing the mother only", "Empathy, listening, observing a feed, and giving practical help", "Only giving written pamphlets", "Ignoring cultural context"],
        ["Always avoid breastfeeding regardless of ARV access", "Follow national guidelines — usually counsel regarding antiretroviral therapy and breastfeeding per policy", "Only feed formula even if unsafe water", "Breastfeed without any counseling"],
        ["Respiratory infections and diarrheal diseases", "Later risk of overweight and diabetes only", "Genetic disorders", "None of the above"],
        ["Paracetamol", "Most antibiotics when appropriate (temporary only)", "Chemotherapy (cytotoxic drugs) — avoid breastfeeding", "Iron supplements"],
        ["IgG", "IgM", "IgA (secretory IgA)", "IgE"],
        ["Breastmilk given before solid foods", "Any fluid given to a newborn before the first breastfeed (e.g., honey, water) — discouraged", "First expressed milk only", "Delayed cord clamping"],
        ["Immediate exclusive direct breastfeeding for all preterms regardless of ability", "Kangaroo mother care, expressed breastmilk, and specialized feeding support as needed", "Only formula feeding recommended", "Early solids at 2 weeks"],
        ["No effect", "May reduce milk production and expose infant to tobacco toxins; counsel to quit and support breastfeeding", "Requires immediate weaning", "Increases milk supply significantly"],
        ["Start of breastfeeding in a mother who previously stopped — possible with support", "Weaning from breast to cup", "Artificial milk production only", "None of the above"],
        ["Good weight gain after first week, 6+ wet diapers/day, normal skin color and alertness", "Constant crying only", "Very dry diapers all the time", "No weight gain until 3 months"],
        ["Advise formula immediately", "Observe a full breastfeeding session, check latch/position, frequency, and infant health", "Stop breastfeeding for 1 week", "Start solids immediately"],
        ["Infant’s tongue-tie only", "Incorrect positioning and shallow latch", "Mother’s milk being too thin", "Breast infection only"],
        ["Immediate surgical correction always", "Use of manual techniques, shell or syringe to draw out nipple before feeding, good latch support", "Never attempt breastfeeding", "Give formula only"],
        ["Recommended in first week universally", "Best delayed until breastfeeding is well established (usually after 3–4 weeks) if possible", "Mandatory for all infants", "A way to replace night feeds"],
        ["Be separated permanently from the baby and never breastfeed", "Receive anti-TB treatment; WHO recommends breastfeeding with appropriate precautions and treatment per guidelines", "Breastfeed without any treatment and no precautions", "Use formula only forever"],
        ["Babies given breastmilk still need plain water in hot climates", "Exclusive breastfeeding means NO water is given during the first 6 months (except as medicine or ORS)", "Water should be given daily instead of nighttime feeds", "Water increases immunity in young infants"],
        ["24 hours at room temp then freeze", "In deep freezer (–18°C) up to 3–6 months depending on freezer type", "Never freeze breastmilk", "Freeze for 3 years"],
        ["Helps thermoregulation, early breastfeeding initiation, and bonding", "Prevents breastfeeding entirely", "Only for preterm babies", "Causes hypoglycemia always"],
        ["Ask only about diet", "Observe a feed, ask about frequency, check baby’s weight and diapers, examine breasts", "Give medication first", "Weigh mother instead"],
        ["At 2 months", "Around 6 months (when infant shows developmental readiness + nutritional need)", "Never", "At 1 month"],
        ["Only frequency of feeds", "Minimum dietary diversity and meal frequency appropriate for age", "Meals only once daily", "Unlimited sweets"],
        ["Immediate formula feeding forever", "Assess severity; provide lactation support; consider frenotomy if persistent problems and local guidelines permit", "Ignore and wait 1 year", "Start solids immediately"],
        ["Always safer than breastmilk", "Can increase risk of infections if water/sanitation inadequate; counseling and safe preparation are essential", "Require no education to use safely", "Reduce malnutrition risk automatically"],
        ["Insulin", "Oxytocin", "Cortisol", "Thyroxine"],
        ["Prolactin (stimulated by suckling and removal)", "Adrenaline", "Progesterone only", "Estrogen only"],
        ["Red, painful area on breast with fever and flu-like symptoms", "Painless soft breasts only", "Always formation of large abscess overnight", "Yellow eyes of baby"],
        ["Marketing free formula samples at health centers", "Training health workers, mother support groups, and workplace breastfeeding policies", "Discouraging breastfeeding education", "Prohibiting family support"],
        ["Expressing and storing milk, employer-provided breaks and space, and continued direct feeds when possible", "Immediate weaning on first day of work", "Giving cow’s milk to newborns", "Avoiding expression always"],
        ["Unrestricted formula distribution to all infants", "Protect, promote and support breastfeeding; controlled, targeted use of formula where necessary with safe preparation and monitoring", "Stop all breastfeeding due to risk", "Use only animal milk for infants"],
        ["Mother gives formula only", "Another lactating woman breastfeeds the infant when mother cannot — should respect cultural and health safety guidelines", "Bottle feeding with expressed milk only", "Using wet wipes for cleaning"],
        ["Baby’s chin touching breast, mouth wide, lower lip turned out", "Baby’s lips pursed and much areola not in baby’s mouth (shallow)", "Rhythmic suck-swallow noises", "Audible swallowing after feeds"],
        ["Immediately give formula", "Stop feed only if baby cannot breathe; allow coughing — reposition and encourage clearing; seek help if persistent distress", "Give solids to clear throat", "Force feed water"],
        ["Always a reason to stop breastfeeding", "Not usually a reason to stop; treat the condition and continue breastfeeding unless medication contraindicated", "Indicate baby must be swapped with another mother", "A reason to introduce solids early"],
        ["Lower in fat than foremilk", "Higher in fat and more satiating than foremilk", "Identical to foremilk always", "Less nutritious always"],
        ["Test-weighing (weigh before and after feed) can estimate intake when needed", "Guess from time only", "Measure mother’s milk output only", "Only use formula volumes"],
        ["Tell her she is lying", "Explore feeding technique, frequency, infant health and support; observe feeding; increase effective removal to increase supply", "Recommend stopping breastfeeding immediately", "Give medication to stop milk"],
        ["Baby sucks directly only", "Mother expresses milk and feeds via bottle or cup without direct breastfeeding", "Never possible", "Pumping combined with solid feeds only"],
        ["Giving pacifier instead of breast", "Good positioning and deep latch at start of breastfeeding", "Using petroleum jelly only always", "Short shallow feeds only"],
        ["Baby refuses spoon only", "Expressed breastmilk is fed to infants, especially small/preterm, when direct breastfeeding is not possible", "Only for formula-fed babies", "Not recommended in any situation"],
        ["Contraindicated always", "Allowed; infant should receive hepatitis B vaccine and HBIG per national guidelines if indicated", "Only allowed after 1 year", "Allowed only with formula supplementation"],
        ["Drink freely — no concerns", "Avoid excessive alcohol; time feeds (wait about 2 hours per standard drink) or express beforehand if consumed", "Always discard entire breastmilk if any alcohol consumed in lifetime", "Stop breastfeeding permanently if ever drank alcohol"],
        ["Encourage block feeding (feeding from one breast per block of time) and more frequent feeds with positioning help; express small amounts if needed", "Stop breastfeeding forever", "Give diuretics only", "Introduce solids early to baby"],
        ["Conservative management only with no medical care", "Medical/surgical drainage plus antibiotics; breastfeeding can often continue from the unaffected breast and expressed milk from affected breast until drained and the clinician advises", "Immediate stopping of all milk expression forever", "No change to management of feeding"],
        ["Increase frequency of effective breast emptying (breastfeed more, express after feeds), skin-to-skin, and lactation support", "Give formula immediately only", "Reduce feeding frequency", "Stop breastfeeding"],
        ["Complementary foods should replace all breastfeeds at 6 months", "Complementary foods should be timely, adequate, safe and appropriate while continuing breastfeeding", "Complementary feeding starts only after 12 months", "Introduce only sugary drinks at 6 months"],
        ["Strong family support and workplace breaks", "Exposure to aggressive formula marketing and lack of lactation support", "Early skin-to-skin contact", "Good antenatal breastfeeding counselling"],
        ["Immediately stop breastfeeding and start formula high calorie only", "Assess feeding technique, frequency, any illness, and consider supplemental feeding if needed alongside support to improve breastfeeding", "Ignore and wait 6 months", "Start solids at 1 month"],
        ["Vitamin D only", "Secretory IgA and various oligosaccharides that protect mucosal surfaces", "Iron at adult levels", "High salt only"],
        ["Routine for all mothers", "Used selectively under lactation guidance, with plan to wean off shield once breastfeeding established", "Permanent solution always", "Banned always"],
        ["Only paediatrician", "Midwives, nurses, lactation counselors, obstetric staff and paediatricians working together", "Only administrative staff", "Non-health staff only"],
        ["Force feeding solids", "Expressed breastmilk by cup, spoon or nasogastric tube as per clinical need", "Only formula by bottle always", "Stop feeding for 24 hours"],
        ["Mother must double caloric intake with no other changes", "Mothers should have adequate calories and fluids; moderate variations rarely stop milk production unless severe malnutrition", "Any dieting will stop milk immediately", "Maternal diet has no effect at all on milk composition or quantity"],
        ["Must stop immediately forever", "Can usually continue while on many antibiotics safe for lactation; follow local prescribing guidance", "Requires switching to formula only", "Requires mother to be hospitalized always"],
        ["Rooting, mouthing, hand-to-mouth movements, and increased alertness", "Stiffening and turning away only", "Crying only (late cue)", "Sleeping and not waking at all"],
        ["Replacing clinicians completely", "Encouraging exclusive breastfeeding, providing counseling, identifying problems and referring when needed", "Discouraging breastfeeding in favor of formula sales", "Only giving vaccines"],
        ["Aggressive marketing of breastmilk substitutes can undermine breastfeeding and should be regulated per the International Code of Marketing of Breast-milk Substitutes", "Formula marketing has no effect on breastfeeding decisions", "Free samples at health centres always help breastfeeding", "Health workers should distribute formula samples routinely"],
        ["Stop breastfeeding and give ORS only by bottle", "Continue breastfeeding and give ORS per protocol; seek medical evaluation", "Immediately start solids", "Give only water"],
        ["Head control, sits with support, shows interest in food, loss of tongue-thrust reflex", "Cannot hold head at all at 6 months", "Sleeps all day always", "Has tooth eruption only at 2 months"],
        ["Promote beneficial gut bacteria", "Direct nutritive value equal to protein for baby’s growth", "Act as decoy receptors for pathogens", "Support immune development"],
        ["Immediate permanent weaning without support", "Seek addiction treatment for mother; weigh risks/benefits with medical team — some substances require avoiding breastfeeding temporarily or permanently", "Encourage heavy use during feeds", "Switch baby to cow’s milk"],
        ["Infant kept in separate nursery away from mother", "Keeping mother and baby together 24 hours to promote breastfeeding and bonding", "Only visiting hours allowed for mother", "A type of breastfeeding formula"],
        ["Formula feeding in upright position always", "Breastfeeding (especially exclusive) reduces ear infections due to immune components and feeding position", "Feeding lying flat always", "Giving sweets early"],
        ["Cooked, mashed or appropriately textured, hygienic preparation, and served immediately or stored safely with reheating if needed", "Always raw and uncooked", "Mixed with unboiled water only", "Refrigeration not required ever"],
        ["Increased exclusive breastfeeding rates at 6 months and improved complementary feeding indicators", "Only hospital-based breastfeeding rates", "Decreased breastfeeding education sessions", "More formula distribution events"],
        ["When there is poor weight gain despite good feeding technique, signs of infection, or any red flags (e.g., dehydration, persistent vomiting)", "Never refer — manage everything in community", "Only if mother requests formula", "After 2 years only"],
        ["Vaccines are contraindicated for breastfeeding infants", "Breastfeeding should continue normally during immunization; it may help comfort the baby and does not reduce vaccine effectiveness", "Stop breastfeeding for 48 hours after vaccination", "Vaccine efficacy is always reduced by breastfeeding"],
        ["Breastfeeding provides absolute contraception forever", "Lactational amenorrhea method (LAM) can be effective in first six months if exclusive breastfeeding and amenorrhea; provide family planning counseling and transition to other methods as required", "Breastfeeding has no effect on fertility at all", "Contraceptives are always contraindicated during breastfeeding"],
        ["Ignore and continue same practice only", "Treat mother and infant per local guidance (topical antifungal for baby, sometimes mother’s nipples treated), and continue breastfeeding with support", "Stop breastfeeding permanently", "Switch to solid food only"],
        ["No breastfeeding breaks and no private space", "Paid maternity leave, workplace lactation rooms, and flexible scheduling for expressing milk", "Requiring mothers to feed only at night", "Immediate termination of employment upon maternity leave"],
        ["Providing practical, emotional support, help with household tasks, and encouragement to mother to continue breastfeeding", "Discouraging breastfeeding always", "Replacing all feeds with formula only", "Only financial support no practical help"],
        ["Always permanent and untreatable", "Can be affected by stress, pain, or previous negative experience; support and relaxation may help; seek lactation help if persistent", "Means milk is poisonous", "Indicates baby should be given solids early"],
        ["No counseling provided", "Counseling mothers about antiretroviral therapy and feeding options per national guidelines — decisions are context-specific and clinically guided", "Universal formula without assessment", "Stopping all vaccinations"],
        ["Positive role models and peer counselors only", "Misleading formula advertising, cultural myths, lack of family support, and limited maternity protections", "Overabundance of lactation counselors always", "Too much paid maternity leave"],
        ["Exclusive breastfeeding for the first 6 months and continued breastfeeding with appropriate complementary feeding thereafter", "Immediate formula feeding only", "Early introduction of solids always", "Delayed breastfeeding until 2 days postpartum"],
        ["Only mother’s height", "Feeding frequency, latch/position observations, milk transfer signs, baby’s output (wet/dirty diapers), weight, and any problems/counseling given", "Only type of formula available in market", "No documentation needed"]
    ],
    answer: [
        // Section I: Original 60 Answers
        2,  // Within the first hour of birth
        1,  // First 6 months of life
        2,  // Colostrum
        1,  // Prolactin
        1,  // Oxytocin
        3,  // Up to 2 years or beyond
        1,  // Foremilk
        2,  // Hindmilk
        3,  // IgA
        1,  // 8-12 times
        2,  // The baby having a mouth full of areola and a wide-open mouth
        2,  // Feeding whenever the baby shows hunger cues
        2,  // Giving pre-lacteal feeds (e.g., honey, sugar water)
        2,  // Rooming-in
        1,  // Reduced risk of breast and ovarian cancer
        3,  // Maternal HIV in settings where replacement feeding is acceptable, feasible, affordable, sustainable, and safe (AFASS)
        2,  // Half or more (50%+)
        2,  // To regulate the newborn's temperature and facilitate early latching
        2,  // Immediately from a health worker or lactation consultant
        1,  // 10
        2,  // Offer the breast again or try non-nutritive sucking (comfort)
        2,  // Nipple confusion and poor latch establishment
        3,  // White blood cells and antibodies (Immunoglobulins)
        2,  // Her baby is less than 6 months old, she is amenorrheic (no menses), and she is exclusively breastfeeding
        1,  // Continue breastfeeding frequently from the affected breast, use warm compresses, and take prescribed antibiotics
        2,  // The baby cries continuously after every feed and is not gaining weight
        1,  // Around 50%
        3,  // All of the above
        1,  // Cow's milk has a much higher protein and mineral content, which can stress a baby's kidneys
        1,  // Up to 4 hours
        2, // 6 months
        2, // Complementary Feeding
        1, // 2-3 meals per day
        1, // 3-4 meals + 1-2 snacks
        2, // Pureed, mashed, or semi-solid
        1, // At least 5
        2, // Flesh foods (meat, poultry, fish) or iron-fortified cereals
        1, // Low energy density, poor nutrient density, and low meal frequency
        3, // Feeding the child based only on the clock schedule
        1, // Increase fluid intake, including more frequent breastfeeding, and offer soft, favourite foods
        1, // Increased risk of infections (diarrhea) and reduced breast milk intake/production
        2, // Increased risk of malnutrition/nutritional deficiencies (especially iron and zinc)
        1, // Vitamin A and Iron
        2, // Washing hands with soap and safe water before preparing and feeding
        2, // Minimum meal frequency and minimum dietary diversity
        1, // 4 times per day or more
        2, // Foods with minimal nutritional value, like sugary drinks and excessive salt
        1, // 6 months
        1, // Gradually moving from pureed/mashed to thicker mashed, then lumpy and chopped/finger foods
        2, // Lady Health Workers (LHWs)
        1, // 1981
        1, // Protect and promote breastfeeding by regulating the marketing of breast-milk substitutes
        1, // The Protection of Breastfeeding and Child Nutrition Ordinance, 2002
        3, // Exclusive Breastfeeding
        2, // Too short for their age (Chronic Malnutrition)
        1, // Too thin for their height (Acute Malnutrition)
        2, // Iodine deficiency
        2, // Optimal Breastfeeding (Exclusive BF for 6 months, continued for 2 years or beyond)
        1, // Teaching them to drink from an open cup starting at 6 months
        2, // The First 1,000 Days

        // Section II: Additional 60 Answers
        2, // Within 1 hour
        1, // Breastmilk only (no other food or drink, except medicines)
        1, // 6 months
        1, // High fat proportion compared to mature milk
        1, // Supply and demand (removal stimulates production)
        2, // 8–12 feeds/day (on demand)
        2, // 2 years or beyond
        1, // Infant with classic galactosemia
        2, // Infant with galactosemia (Note: This refers to the infant condition as the reason to avoid breastfeeding)
        1, // Continue frequent correct positioning and latch; treat nipple if needed
        1, // Wide open mouth, lower lip turned out, more areola visible above than below
        0, // Baby’s weight gain over time and audible swallowing during feeds
        1, // Inflammation of breast tissue; may be with infection and systemic symptoms
        1, // Continue breastfeeding frequently, ensure emptying; seek antibiotics if systemic signs
        0, // 1–3 days postpartum when milk comes in and breasts are full
        3, // All of the above
        1, // 6–8 wet diapers/day and steady weight gain after first week
        1, // Several feeds close together in a short period — normal behavior
        1, // Poor latch leading to nipple pain and inadequate transfer
        0, // Wake baby and encourage feeding frequently; skin-to-skin contact to stimulate
        1, // 3–5 days
        3, // All of the above
        3, // Abrupt cessation of breastfeeding from the affected breast for weeks
        1, // Potentially interfere with establishing breastfeeding if introduced too early
        1, // Skin-to-skin contact and early initiation of breastfeeding
        1, // Empathy, listening, observing a feed, and giving practical help
        1, // Follow national guidelines — usually counsel regarding antiretroviral therapy and breastfeeding per policy
        0, // Respiratory infections and diarrheal diseases
        2, // Chemotherapy (cytotoxic drugs) — avoid breastfeeding
        2, // IgA (secretory IgA)
        1, // Any fluid given to a newborn before the first breastfeed (e.g., honey, water) — discouraged
        1, // Kangaroo mother care, expressed breastmilk, and specialized feeding support as needed
        1, // May reduce milk production and expose infant to tobacco toxins; counsel to quit and support breastfeeding
        0, // Start of breastfeeding in a mother who previously stopped — possible with support
        0, // Good weight gain after first week, 6+ wet diapers/day, normal skin color and alertness
        1, // Observe a full breastfeeding session, check latch/position, frequency, and infant health
        1, // Incorrect positioning and shallow latch
        1, // Use of manual techniques, shell or syringe to draw out nipple before feeding, good latch support
        1, // Best delayed until breastfeeding is well established (usually after 3–4 weeks) if possible
        1, // Receive anti-TB treatment; WHO recommends breastfeeding with appropriate precautions and treatment per guidelines
        1, // Exclusive breastfeeding means NO water is given during the first 6 months (except as medicine or ORS)
        1, // In deep freezer (–18°C) up to 3–6 months depending on freezer type
        0, // Helps thermoregulation, early breastfeeding initiation, and bonding
        1, // Observe a feed, ask about frequency, check baby’s weight and diapers, examine breasts
        1, // Around 6 months (when infant shows developmental readiness + nutritional need)
        1, // Minimum dietary diversity and meal frequency appropriate for age
        1, // Assess severity; provide lactation support; consider frenotomy if persistent problems and local guidelines permit
        1, // Can increase risk of infections if water/sanitation inadequate; counseling and safe preparation are essential
        1, // Oxytocin
        0, // Prolactin (stimulated by suckling and removal)
        0, // Red, painful area on breast with fever and flu-like symptoms
        1, // Training health workers, mother support groups, and workplace breastfeeding policies
        0, // Expressing and storing milk, employer-provided breaks and space, and continued direct feeds when possible
        1, // Protect, promote and support breastfeeding; controlled, targeted use of formula where necessary with safe preparation and monitoring
        1, // Another lactating woman breastfeeds the infant when mother cannot — should respect cultural and health safety guidelines
        1, // Baby’s lips pursed and much areola not in baby’s mouth (shallow)
        1, // Stop feed only if baby cannot breathe; allow coughing — reposition and encourage clearing; seek help if persistent distress
        1, // Not usually a reason to stop; treat the condition and continue breastfeeding unless medication contraindicated
        1, // Higher in fat and more satiating than foremilk
        0, // Test-weighing (weigh before and after feed) can estimate intake when needed
        1, // Explore feeding technique, frequency, infant health and support; observe feeding; increase effective removal to increase supply
        1, // Mother expresses milk and feeds via bottle or cup without direct breastfeeding
        1, // Good positioning and deep latch at start of breastfeeding
        1, // Expressed breastmilk is fed to infants, especially small/preterm, when direct breastfeeding is not possible
        1, // Allowed; infant should receive hepatitis B vaccine and HBIG per national guidelines if indicated
        1, // Avoid excessive alcohol; time feeds (wait about 2 hours per standard drink) or express beforehand if consumed
        0, // Encourage block feeding (feeding from one breast per block of time) and more frequent feeds with positioning help; express small amounts if needed
        1, // Medical/surgical drainage plus antibiotics; breastfeeding can often continue from the unaffected breast and expressed milk from affected breast until drained and the clinician advises
        0, // Increase frequency of effective breast emptying (breastfeed more, express after feeds), skin-to-skin, and lactation support
        1, // Complementary foods should be timely, adequate, safe and appropriate while continuing breastfeeding
        1, // Exposure to aggressive formula marketing and lack of lactation support
        1, // Assess feeding technique, frequency, any illness, and consider supplemental feeding if needed alongside support to improve breastfeeding
        1, // Secretory IgA and various oligosaccharides that protect mucosal surfaces
        1, // Used selectively under lactation guidance, with plan to wean off shield once breastfeeding established
        1, // Midwives, nurses, lactation counselors, obstetric staff and paediatricians working together
        1, // Expressed breastmilk by cup, spoon or nasogastric tube as per clinical need
        1, // Mothers should have adequate calories and fluids; moderate variations rarely stop milk production unless severe malnutrition
        1, // Can usually continue while on many antibiotics safe for lactation; follow local prescribing guidance
        0, // Rooting, mouthing, hand-to-mouth movements, and increased alertness
        1, // Encouraging exclusive breastfeeding, providing counseling, identifying problems and referring when needed
        0, // Aggressive marketing of breastmilk substitutes can undermine breastfeeding and should be regulated per the International Code of Marketing of Breast-milk Substitutes
        1, // Continue breastfeeding and give ORS per protocol; seek medical evaluation
        0, // Head control, sits with support, shows interest in food, loss of tongue-thrust reflex
        1, // Direct nutritive value equal to protein for baby’s growth
        1, // Seek addiction treatment for mother; weigh risks/benefits with medical team — some substances require avoiding breastfeeding temporarily or permanently
        1, // Keeping mother and baby together 24 hours to promote breastfeeding and bonding
        1, // Breastfeeding (especially exclusive) reduces ear infections due to immune components and feeding position
        0, // Cooked, mashed or appropriately textured, hygienic preparation, and served immediately or stored safely with reheating if needed
        0, // Increased exclusive breastfeeding rates at 6 months and improved complementary feeding indicators
        0, // When there is poor weight gain despite good feeding technique, signs of infection, or any red flags (e.g., dehydration, persistent vomiting)
        1, // Breastfeeding should continue normally during immunization; it may help comfort the baby and does not reduce vaccine effectiveness
        1, // Lactational amenorrhea method (LAM) can be effective in first six months if exclusive breastfeeding and amenorrhea; provide family planning counseling and transition to other methods as required
        1, // Treat mother and infant per local guidance (topical antifungal for baby, sometimes mother’s nipples treated), and continue breastfeeding with support
        1, // Paid maternity leave, workplace lactation rooms, and flexible scheduling for expressing milk
        0, // Providing practical, emotional support, help with household tasks, and encouragement to mother to continue breastfeeding
        1, // Can be affected by stress, pain, or previous negative experience; support and relaxation may help; seek lactation help if persistent
        1, // Counseling mothers about antiretroviral therapy and feeding options per national guidelines — decisions are context-specific and clinically guided
        1, // Misleading formula advertising, cultural myths, lack of family support, and limited maternity protections
        0, // Exclusive breastfeeding for the first 6 months and continued breastfeeding with appropriate complementary feeding thereafter
        1 // Feeding frequency, latch/position observations, milk transfer signs, baby’s output (wet/dirty diapers), weight, and any problems/counseling given
    ]
};
// ----------------------------------------------------------------------
// END OF FULL QUIZ DATA (120 Questions)
// ----------------------------------------------------------------------

body.classList.add('green-color');
// Check if count is -1 (start of quiz) and set initial text, otherwise load from local storage
if(count === -1){
    question.innerText = "Ready to start the IYCF Quiz?";
} else {
    question.innerText = data.question[count];
}


startBtn.addEventListener('click',()=>{
    questionTab.classList.remove('display-none');
    startTab.classList.add('display-none');
    body.classList.add('green-color');
    score.classList.remove('display-none');
    myAudio.play();
    nextBtn.click(); // Trigger next question to load first question
})

questionChoice.addEventListener('click',(e)=>{
    let x=Array.from(questionChoice.children);
    if(x.includes(e.target) && !e.target.classList.contains('disabled')){ 
        let value=e.target;
        index=parseInt(value.getAttribute('index'));
        
        // Remove previous indicators if present
        x.forEach(y => {
             let indicatorTick = y.querySelector('.tick');
             let indicatorWrong = y.querySelector('.wrong');
             if (indicatorTick) {
                indicatorTick.remove();
             }
             if (indicatorWrong) {
                indicatorWrong.remove();
             }
        });

        if(index==data.answer[count]){
            value.append(correctAns.cloneNode(true)); // Use cloneNode for multiple uses
            rightSound.play();
            clearInterval(totalTime);
            correctAnswer++;
            localStorage.setItem("myData",JSON.stringify(myData))
        }
        else{
            value.append(wrongAns.cloneNode(true)); // Use cloneNode for multiple uses
            let correct=allQuestions[data.answer[count]];
            correct.append(correctAns.cloneNode(true)); // Use cloneNode
            wrongSound.play();
            clearInterval(totalTime)
        }
        
        // Disable all choices after a selection is made
        x.forEach((y)=>{
            y.classList.add('disabled');
        })
        nextBtn.classList.remove('disabled');
    }
})

nextBtn.addEventListener('click',()=>{
    count++; // Increment count
    
    // Check if the quiz is finished (120 questions total, so last index is 119)
    if(count === totalQuestions){ 
        questionTab.classList.add('display-none');
        result.classList.remove('display-none');
        clearInterval(totalTime);
        finalize();
        // Clear local storage upon completion for a fresh start next time
        localStorage.removeItem("myData"); 
    }
    else{
        // Save current state
        myData.count=count;
        myData.questionNumber=questionNumber;
        localStorage.setItem("myData",JSON.stringify(myData));
        
        // Reset colors and start timer
        changeBackgroundColor(body,"#CCE2C2")
        changeBackgroundColor(actualTime,"#02A409")
        changeBackgroundColor(nextBtn,"#CCE2C2") 
        changeColor(nextBtn,"#02A409") 
        
        totalTime=timer();
        currentQuestionNumber.innerText=questionNumber.toString().padStart(2, '0'); // Add leading zero
        questionNumber++;
        
        // Load next question
        question.innerText= data.question[count];
        
        // Reset choice elements
        allQuestions.forEach((x,i)=>{
            // Remove the previous tick/cross spans
            let indicatorTick = x.querySelector('.tick');
            let indicatorWrong = x.querySelector('.wrong');
            if (indicatorTick) {
                indicatorTick.remove();
            }
            if (indicatorWrong) {
                indicatorWrong.remove();
            }
            
            x.innerText= data.choice[count][i] // Load new choice text
            
            x.classList.remove('disabled'); // Re-enable choices
        })
        
        // Next button should be disabled until a choice is made
        nextBtn.classList.add('disabled'); 
    }
})

retryBtn.addEventListener('click',()=>{
    // Clear all persistent data and reload
    localStorage.clear(); 
    location.reload();
})

// Initial call to set up first question based on count (if not -1)
if(count > -1){
    // This section runs if a quiz is being resumed
    allQuestions.forEach(x => x.classList.remove('disabled')); 
    nextBtn.classList.add('disabled');
    question.innerText = data.question[count];
    allQuestions.forEach((x,i)=>{
        x.innerText= data.choice[count][i]
    })
    currentQuestionNumber.innerText=questionNumber.toString().padStart(2, '0');
    
    // Resume quiz from question tab if needed
    questionTab.classList.remove('display-none');
    startTab.classList.add('display-none');
    body.classList.add('green-color');
    score.classList.remove('display-none');
    
    // Start timer for the resumed question
    totalTime=timer();
}