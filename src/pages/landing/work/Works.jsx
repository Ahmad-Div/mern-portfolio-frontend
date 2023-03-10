import React, { useState, useRef } from "react";
import LoadingBlogSkeleton from "../../../components/loading/LoadingBlogSkeleton";
import WorkCard from "./WorkCard";
import { Element } from "react-scroll";
import { connect } from "react-redux";
const Works = ({ BACKEND_HOST, t, i18n, work }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const containerRef = useRef(null);

  //mouse dragging event

  const handleMouseDown = (event) => {
    setIsDragging(true);
    setStartX(event.clientX - containerRef.current.scrollLeft);
  };

  const handleMouseMove = (event) => {
    if (!isDragging) return;
    event.preventDefault();
    const x = event.clientX - startX;
    containerRef.current.scrollLeft = x;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Element name="works" className="w-100">
      <section id="works" className="works flex flex-column justify-left align-center w-100 gap-2">
        <h1 className="heading">{t("work.title")}</h1>
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={
            work.works.length === 1
              ? "workCards flex flex-row justify-center align-center  flex-nowrap w-100  gap-2"
              : "workCards flex flex-row  align-center flex-nowrap w-100  gap-2"
          }
        >
          {work.works.length === 0 && work.loading ? (
            <>
              <LoadingBlogSkeleton />
              <LoadingBlogSkeleton />
              <LoadingBlogSkeleton />
            </>
          ) : work.works.length > 0 && !work.loading ? (
            <>
              {work.works.map((work, index) => {
                return (
                  <WorkCard
                    id={work._id}
                    key={index}
                    BACKEND_HOST={BACKEND_HOST}
                    image={work.image}
                    companyName={work.companyName}
                    enTitle={work.enTitle}
                    arTitle={work.arTitle}
                    krTitle={work.krTitle}
                    from={work.from}
                    to={work.to}
                    i18n={i18n}
                  />
                );
              })}
            </>
          ) : null}
        </div>

        <div className="seeMoreAdvice flex flex-row justify-center align-center w-100  gap-1">
          <span>
            <i className="fa-solid fa-arrow-pointer"></i>
          </span>
          <small>{t("drag")}</small>
        </div>
      </section>
    </Element>
  );
};

const mapStateToProps = (state) => ({
  work: state.work,
});

export default connect(mapStateToProps, {})(Works);
