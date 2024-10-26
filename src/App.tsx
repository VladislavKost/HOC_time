import { useState } from "react";
import moment from "moment";
import "./App.css";

function DateTime(props: { date: string }) {
  return <p className="date">{props.date}</p>;
}

function DateTimePretty(Component: any) {
  return function (props: { date: string }) {
    const videoDate = moment(props.date);
    const now = moment();
    const timeDiff = now.diff(videoDate);

    let new_date = null;

    if (timeDiff < moment.duration(1, "hour").asMilliseconds()) {
      new_date = `${Math.floor(
        moment.duration(timeDiff).asMinutes()
      )} минут назад`;
    } else if (timeDiff < moment.duration(1, "day").asMilliseconds()) {
      new_date = `${Math.floor(
        moment.duration(timeDiff).asHours()
      )} часов назад`;
    } else if (timeDiff < moment.duration(30, "days").asMilliseconds()) {
      new_date = `${Math.floor(moment.duration(timeDiff).asDays())} дней назад`;
    } else if (timeDiff < moment.duration(1, "year").asMilliseconds()) {
      new_date = `${Math.floor(
        moment.duration(timeDiff).asMonths()
      )} месяцев назад`;
    } else {
      new_date = `${Math.floor(moment.duration(timeDiff).asYears())} лет назад`;
    }

    return <Component {...props} date={new_date} />;
  };
}

function Video(props: { url: string; date: string }) {
  const FormattedDateTime = DateTimePretty(DateTime);
  return (
    <div className="video">
      <iframe
        src={props.url}
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <FormattedDateTime date={props.date} />
    </div>
  );
}
function VideoList(props: { list: { url: string; date: string }[] }) {
  return props.list.map((item) => <Video url={item.url} date={item.date} />);
}
export default function App() {
  const [list, setList] = useState([
    {
      url: "https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2024-10-25 13:24:00",
    },
    {
      url: "https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2024-10-24 12:10:00",
    },
    {
      url: "https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2024-10-26 10:26:00",
    },
    {
      url: "https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2024-05-03 12:10:00",
    },
    {
      url: "https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2024-01-01 16:17:00",
    },
    {
      url: "https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0",
      date: "2017-12-02 05:24:00",
    },
  ]);

  return <VideoList list={list} />;
}
