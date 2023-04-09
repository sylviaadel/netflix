import { useState, useEffect } from "react";
import { readDocuments } from "../../scripts/fireStore/readDocuments";
import { useItems } from "../../state/ItemsProvider";
import TopTenItem from "./TopTenItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from "../shared/SliderArrows";

export default function Top10() {
  const { data, dispatch } = useItems();
  const [status, setStatus] = useState(0);
  const [modal, setModal] = useState(null);
  const collection = "titles";
  const topTen = data.filter((item) => item.topTen === true);

  var settings = {
    centerPadding: "60px",
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: -0.25,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  useEffect(() => {
    loadData(collection);
  }, []);
  async function loadData(collection) {
    const data = await readDocuments(collection).catch(onFail);
    onSuccess(data);
  }

  function onSuccess(data) {
    dispatch({ type: "initializeArray", payload: data });
    setStatus(1);
  }

  function onFail() {
    setStatus(2);
  }

  const Items = topTen.map((item) => <TopTenItem key={item.id} item={item} />);

  return (
    <section className="top10-container">
      <h3>Top 10 TV in Sweden Today</h3>
      <ol>
        <Slider {...settings}>{Items}</Slider>
      </ol>
    </section>
  );
}
