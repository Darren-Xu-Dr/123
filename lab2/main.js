function generateCourseTable() {
    let topicCount = topic.length;
    let millisecsPerDay = 24*60*60*1000;
    
    $("#courseTable").html(""); // 清空表格內容

    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");

    for(var x=0;x<topicCount;x++){
        let currentDate = new Date(startDate.getTime()+7*x*millisecsPerDay);
        let formattedDate = currentDate.toLocaleDateString(undefined, {month: '2-digit', day: '2-digit'});
        let isHoliday = currentDate.getDay() === 0 || currentDate.getDay() === 6; // 判斷是否為假日

        // 產生表格列，若是假日則設定為灰色
        $("#courseTable").append(
        "<tr>"+
        `<td>${x+1}</td>`+
        `<td>${formattedDate}</td>`+
        `<td ${isHoliday ? 'style="color: gray;"' : ''}>${topic[x]}</td>`+
        "</tr>");
    }
}

$(function(){
    // 取得使用者選擇的日期
    $("#datePicker").on("change", function(){
        let selectedDate = new Date($(this).val());
        setMonthAndDay(selectedDate.getMonth() + 1, selectedDate.getDate());
        generateCourseTable();
    });

    // 初始化日期選擇器為當前日期
    let today = new Date();
    $("#datePicker").val(today.toISOString().substr(0,10));
    setMonthAndDay(today.getMonth() + 1, today.getDate());
    generateCourseTable();
});