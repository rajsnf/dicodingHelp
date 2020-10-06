const compete_id = 2014;
const base_url = "https://api.football-data.org/v2/";
const team_url = `${base_url}competitions/${compete_id}/teams`;
var standing_ep = `${base_url}competitions/${compete_id}/standings?standingType=TOTAL`;
var matches_ep = `${base_url}competitions/${compete_id}/matches`;

const fetchAPI = (url) => {
    return fetch(url, {
        headers: {
            'X-Auth-Token': "1397c8108db54c8c9b101cbd6a2d273f"
        }
    });
}
function status(response) {
    if (response.status !== 200) {
        console.log("Error : " + response.status);
        // Method reject() akan membuat blok catch terpanggil
        return Promise.reject(new Error(response.statusText));
    } else {
        // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
        return Promise.resolve(response);
    }
}
function json(response) {
    return response.json();
}
function error(error) {
    // Parameter error berasal dari Promise.reject()
    console.log("Error : " + error);
}

function getTeams() {
    fetchAPI(team_url)
        .then(status)
        .then(json)
        .then(function (data) {
            let teamsHTML = "";
            data.result.forEach(function (team) {
                teamsHTML += `
                <div class="card">
                  <a href="./team.html?id=${team.id}">
                    <div class="card-image waves-effect waves-block waves-light">
                      <img src="${team.crestUrl}" />
                    </div>
                  </a>
                  <div class="card-content">
                    <span class="card-title truncate">${team.name}</span>
                  </div>
                </div>
              `;
            });
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("listteam").innerHTML = teamsHTML;
        })
        .catch(error);
}