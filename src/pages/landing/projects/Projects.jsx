import React, { useRef, useState } from "react";
import { Element } from "react-scroll";
import ProjectCard from "../../../components/projects/ProjectCard";
import LoadingBlogSkeleton from "../../../components/loading/LoadingBlogSkeleton";
import { connect } from "react-redux";
const Projects = ({ BACKEND_HOST, t, i18n, project }) => {
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
    <Element className="w-100" name="projects">
      <section id="projects" className="projects flex flex-column justify-left align-center w-100 gap-2">
        <h1 className="heading">{t("nav.projects")}</h1>
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={
            project.projects.length === 1
              ? "projectCards flex flex-row justify-center align-center  flex-nowrap w-100  gap-2"
              : "projectCards flex flex-row  align-center flex-nowrap w-100  gap-2"
          }
        >
          {project.loading ? (
            <>
              <LoadingBlogSkeleton />
              <LoadingBlogSkeleton />
              <LoadingBlogSkeleton />
            </>
          ) : (
            <>
              {project.projects.map((project, index) => {
                return (
                  <ProjectCard
                    BACKEND_HOST={BACKEND_HOST}
                    key={index}
                    img={project.image}
                    enTitle={project.enTitle}
                    arTitle={project.arTitle}
                    krTitle={project.krTitle}
                    id={project._id}
                    url={project.url}
                    i18n={i18n}
                    urlName={project.urlName}
                  />
                );
              })}
            </>
          )}
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
  project: state.project,
});

export default connect(mapStateToProps, {})(Projects);
