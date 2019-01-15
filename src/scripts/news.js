(function () {
    fetch(`http://myvolley.ru/api/tournament?request=news&id=397`)
        .then(res => res.json())
        .then(json => {
            console.log(json);
            // allTeams = json;
            // const formatedResult = [];

            // json[0].map(item => {
            //     const {
            //         teamName,
            //         teamId
            //     }= item;

            //     formatedResult.push({
            //         teamName,
            //         teamId
            //     });
            // });
            // return formatedResult;
        })
})();