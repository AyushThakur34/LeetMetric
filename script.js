document.addEventListener("DOMContentLoaded", function(){

    const usernameInput = document.getElementById("user-input");
    const searchButton = document.getElementById("search-button");
    const statsContainer = document.querySelector(".stats-container");
    const easyProgressCircle = document.querySelector(".easy-progress");
    const mediumProgressCircle = document.querySelector(".medium-progress");
    const hardProgressCircle = document.querySelector(".hard-progress");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    const cardsContainer = document.querySelector(".card-container");

    // return true or false based on regex
    function validateUsername(username){
        if(username.trim() === ""){
            alert("Username should not be empty");
            return false;
        }

        const regex = /^[a-zA-Z][a-zA-Z0-9-_]{0,15}$/;
        const match = regex.test(username);
        if(!match){
            alert("Please enter a valid username");
            usernameInput.value = "";
            return false;
        }
        else return true;
    }

    function updateProgress(solved, total, label, circle){
        const progressDegree = (solved / total) * 100;
        circle.style.setProperty("--progress-degree", `${progressDegree}%`);
        label.textContent = `${solved} / ${total}`;
    }

    function displayUserData(parsedData){
        const totalQues = parsedData.totalQuestions;
        const totalSol = parsedData.totalSolved;

        const teasy = parsedData.totalEasy;
        const easySol =  parsedData.easySolved;

        const tmedium = parsedData.totalMedium;
        const mediumSol =  parsedData.mediumSolved;

        const thard = parsedData.totalHard;
        const hardSol =  parsedData.hardSolved;

        updateProgress(easySol, teasy, easyLabel, easyProgressCircle);
        updateProgress(mediumSol, tmedium, mediumLabel, mediumProgressCircle);
        updateProgress(hardSol, thard, hardLabel, hardProgressCircle);

        const cards = [
            {label: "Accuracy: ",value: parsedData.acceptanceRate},
            {label: "Rank: ",value: parsedData.ranking}, 
            {label: "Contribution: ",value: parsedData.contributionPoints}, 
            {label: "Reputation: ",value: parsedData.reputation}
        ];

        cardsContainer.innerHTML = cards.map(
            data => {
                return `
                    <div class="card">
                        <h4>${data.label}</h3>
                        <p>${data.value}</p>
                    </div>
                `;
            }
        ).join("");
    }

    // fetching user details using api
    async function fetchUserDetails(username){
        const url = `https://leetcode-stats-api.herokuapp.com/${username}`;
        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            statsContainer.style.display = "none";

            const response = await fetch(url);
            if(!response.ok){
                throw new Error("Unable to fetch the user details");
            }
            else{
                const parsedData = await response.json();
                statsContainer.style.display = "block";
                displayUserData(parsedData);
                console.log(parsedData);
            }
        }
        catch(error){
            statsContainer.style.display = "block";
            statsContainer.innerHTML = `<p>No data found!</p>`;
        }
        finally{
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    searchButton.addEventListener("click", function(){
        const username = usernameInput.value;
        if(validateUsername(username)){
            fetchUserDetails(username);
        }
    });

});