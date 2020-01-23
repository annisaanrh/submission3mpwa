var base_url =  "https://api.football-data.org/v2/";
var teams = [];

// Blok kode yang akan di panggil jika fetch berhasil
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
// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}
// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

const fetchApi = function (url) {
    return fetch(url, {
        headers: {
            'X-Auth-Token': '37209e11774845f298285ae0df906655'
        }
    })
}

// Blok kode untuk melakukan request data json

function getStandings() {
    if ("caches" in window) {
        caches.match(base_url + "competitions/2002/standings").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    var articlesHTML = 
                        `<table class="responsive-table" style="font-size:16px center;">
                                <thead>
                                    <tr> 
                                        <th>Team</th>
                                        <th>Logo</th>
                                        <th>Won</th>
                                        <th>Draw</th>
                                        <th>Lost</th>
                                        <th>Goal Difference</th>
                                        <th>Goal Against</th>  
                                        <th>Goal</th>
                                        <th>Played Games</th>  
                                        <th>Points</th>
                                        <th>Position</th>
                                    </tr>
                                </thead>
                            <tbody>
                            `;
                        data.standings["0"].table.forEach(function(item){
                                    articlesHTML += `
                                        <tr>
                                            <td>${item.team.name}</td>
                                            <td style><img style="width:50px;" src="${item.team.crestUrl.replace(/^http:\/\//i, 'https://')}"></td>
                                            <td>${item.won}</td>    
                                            <td>${item.draw}</td>
                                            <td>${item.lost}</td>
                                            <td>${item.goalDifference}</td>
                                            <td>${item.goalsAgainst}</td>
                                            <td>${item.goalsFor}</td>
                                            <td>${item.playedGames}</td>
                                            <td>${item.points}</td>
                                            <td>${item.position}</td>
                                        </tr>
                                        `;
                                });
                            articlesHTML += `
                                </tbody>
                            </table>
                            `;
                });
                    document.getElementById("articles").innerHTML = articlesHTML;
                        var save = document.getElementById("save");
            }
        });
    }
    
   fetchApi(base_url + "competitions/2002/standings") 
        .then(res => {
          if (res.status !== 200) {
                console.log("Error : " + response.status);
            return Promise.reject(new Error(response.statusText))
          } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .then(function(data) {
            var articlesHTML = 
                `<table class="responsive-table" style="font-size:16px center;">
                <thead>
                    <tr> 
                        <th>Team</th>
                        <th>Logo</th>
                        <th>Won</th>
                        <th>Draw</th>
                        <th>Lost</th>
                        <th>Goal Difference</th>
                        <th>Goal Against</th>  
                        <th>Goal</th>
                        <th>Played Games</th>  
                        <th>Points</th>
                        <th>Position</th>
                    </tr>
                </thead>
                <tbody>
                `;
                data.standings["0"].table.forEach(function(item){
                    articlesHTML += `
                            <tr>
                                <td>${item.team.name}</td>
                                <td style><img style="width:50px;" src="${item.team.crestUrl.replace(/^http:\/\//i, 'https://')}"></td>
                                <td>${item.won}</td>    
                                <td>${item.draw}</td>
                                <td>${item.lost}</td>
                                <td>${item.goalDifference}</td>
                                <td>${item.goalsAgainst}</td>
                                <td>${item.goalsFor}</td>
                                <td>${item.playedGames}</td>
                                <td>${item.points}</td>
                                <td>${item.position}</td>
                            </tr>
                            `;
                });
                    articlesHTML += `
                </tbody>
                </table>
                `;
        document.getElementById("articles").innerHTML = articlesHTML;
        })
        .catch(error);
    }

function getTeams(){
    if ("caches" in window) {
        caches.match(base_url + "competitions/2002/teams").then(function(response) {
            if (response) {
                response.json().then(function(data) {
                    var articlesTeam = 
                        `<table class="responsive-table" style="font-size:16px center;">
                            <thead>
                                <tr> 
                                    <th>Name</th>
                                    <th>Picture</th>
                                    <th>Address</th>
                                    <th>Email</th>  
                                    <th>Founded</th>
                                    <th>Save To Favorite</th>
                                </tr>
                            </thead>
                        <tbody>
                        `;
                        teams = data.teams
                        var i = 0
                        data.teams.forEach(function(item){
                            articlesTeam += `
                                <tr>
                                    <td><a href="${item.website}">${item.name}</a></td>
                                    <td style><img style="width:50px;" src="${item.crestUrl.replace(/^http:\/\//i, 'https://')}"></td>
                                    <td>${item.address}</td>    
                                    <td>${item.email}</td>
                                    <td>${item.founded}</td>
                                    <td><button onclick="save(${i})">Save</button></td>
                                </tr>
                                `;
                            i++;
                        });
                        articlesTeam += `
                        </tbody>
                        </table>
                        `;   
                    document.getElementById("articlesTeam").innerHTML = articlesTeam;
                      var save = document.getElementById("save");
                        save.onclick = function() {
                        console.log("Team Saved.");
                    }
            });
        }
    });
}
    fetchApi(base_url + "competitions/2002/teams")   
        .then(res => {
          if (res.status !== 200) {
                console.log("Error : " + response.status);
            return Promise.reject(new Error(response.statusText))
          } else {
                return Promise.resolve(res)
            }
        })
        .then(res => res.json())
        .then(function(data) {
            console.log(data);
                var articlesTeam = 
                    `<table class="responsive-table" style="font-size:16px center;">
                    <thead>
                        <tr> 
                            <th>Name</th>
                            <th>Picture</th>
                            <th>Address</th>
                            <th>Email</th>  
                            <th>Founded</th>
                            <th>Save To Favorite</th>
                        </tr>
                    </thead>
                    <tbody>
                    `;
                teams = data.teams
                var i = 0
                data.teams.forEach(function(item){
                    articlesTeam += `
                        <tr>
                            <td><a href="${item.website}">${item.name}</a></td>
                            <td style><img style="width:50px;" src="${item.crestUrl.replace(/^http:\/\//i, 'https://')}"></td>
                            <td>${item.address}</td>    
                            <td>${item.email}</td>
                            <td>${item.founded}</td>
                            <td><button onclick="save(${i})">Save</button></td>
                        </tr>
                        `;
                    i++;
                });
                    articlesTeam += `
                    </tbody>
                    </table>
                    `;   
            document.getElementById("articlesTeam").innerHTML = articlesTeam;
              var save = document.getElementById("save");
                save.onclick = function() {
                console.log("Team Saved.");
            }
        })
        .catch(error);
}
function save(id) {
    console.log(teams[id]);
    dbPromised.then(function(db) {
      var tx = db.transaction("teams", "readwrite");
      var store = tx.objectStore("teams");
      store.put(teams[id]);
      return tx.complete;
    })
    .then(function() {
      console.log("Tim Favorite berhasil di simpan.");
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised.then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        return store.getAll();
      })
      .then(function(teams) {
        resolve(teams);
      });
  });
}

function getSavedTeams() {
  getAll().then(function(teams) {
        var articlesTeam = 
            `<table style="font-size:16px center;">
            <thead>
                <tr> 
                    <th>Name</th>
                    <th>Picture</th>
                    <th>Address</th>
                    <th>Email</th>  
                    <th>Founded</th>
                    <th>Delete From Favorite</th>
                </tr>
            </thead>
            <tbody>
            `;
    teams.forEach(function(item) {
              articlesTeam += `
                <tr>
                    <td><a href="${item.website}">${item.name}</a></td>
                    <td style><img style="width:50px;" src="${item.crestUrl}"></td>
                    <td>${item.address}</td>    
                    <td>${item.email}</td>
                    <td>${item.founded}</td>
                    <td><button onclick="hapus(${item.id})">Delete</button></td>
                </tr>
                `;
    });
    document.getElementById("body-content").innerHTML = articlesTeam;
  });
}

function hapus(id){
    dbPromised.then(function(db) {
      var tx = db.transaction('teams', 'readwrite');
      var store = tx.objectStore('teams');
      store.delete(id);
      return tx.complete;
    }).then(function() {
      console.log('Item deleted');
    });
}