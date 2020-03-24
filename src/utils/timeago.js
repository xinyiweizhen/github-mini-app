// eslint-disable-next-line import/prefer-default-export
export const timeago = dateTimeStamp => {   //dateTimeStamp是一个时间毫秒，注意时间戳是秒的形式，在这个毫秒的基础上除以1000，就是十位数的时间戳。13位数的都是时间毫秒。
    let minute = 1000 * 60;      //把分，时，天，周，半个月，一个月用毫秒表示
    let hour = minute * 60;
    let day = hour * 24;
    let week = day * 7;
    let month = day * 30;
    let now = new Date().getTime();   //获取当前时间毫秒
    let diffValue = now - dateTimeStamp;//时间差
  
    if(diffValue < 0){
      return;
    }
    let minC = diffValue/minute;  //计算时间差的分，时，天，周，月
    let hourC = diffValue/hour;
    let dayC = diffValue/day;
    let weekC = diffValue/week;
    let monthC = diffValue/month;
    let result = null
    if(monthC >= 1 && monthC <= 3){
      result = " " + parseInt(monthC) + " month(s) ago"
    }else if(weekC >= 1 && weekC <= 3){
      result = " " + parseInt(weekC) + " week(s) ago"
    }else if(dayC >= 1 && dayC <= 6){
      result = " " + parseInt(dayC) + " day(s) ago"
    }else if(hourC >= 1 && hourC <= 23){
      result = " " + parseInt(hourC) + " hour(s) ago"
    }else if(minC >= 1 && minC <= 59){
      result =" " + parseInt(minC) + " minute(s) ago"
    }else if(diffValue >= 0 && diffValue <= minute){
      result = "just now"
    }else {
      let datetime = new Date();
      datetime.setTime(dateTimeStamp);
      let Nyear = datetime.getFullYear();
      let Nmonth = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
      let Ndate = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      let Nhour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
      let Nminute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
      let Nsecond = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
      result = Nyear + "-" + Nmonth + "-" + Ndate + ' ' + Nhour + ':' + Nminute + ':' + Nsecond
    }
    return result;
  }