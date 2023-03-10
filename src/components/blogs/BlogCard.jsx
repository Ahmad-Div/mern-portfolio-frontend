import React, { useEffect } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
const BlogCard = ({ time, id, img, enBody, arBody, krBody, BACKEND_HOST, t, i18n }) => {
  return (
    <div className="blogCard flex flex-column justify-between align-center  gap-1">
      <div className="flex flex-column justify-center align-center gap-1 w-100">
        <img src={`${img}`} alt="blogImage" />
        {i18n.language === "en" ? (
          <p>{DOMPurify.sanitize(enBody.replace(/<br\s*[\/]?>/gi, ""), { ADD_TAGS: ["br"] }).substring(0, 120) + "..."}</p>
        ) : i18n.language === "ar" ? (
          <p>{DOMPurify.sanitize(arBody.replace(/<br\s*[\/]?>/gi, ""), { ADD_TAGS: ["br"] }).substring(0, 120) + "..."}</p>
        ) : (
          <p>{DOMPurify.sanitize(krBody.replace(/<br\s*[\/]?>/gi, ""), { ADD_TAGS: ["br"] }).substring(0, 120) + "..."}</p>
        )}
      </div>
      <div className="flex flex-column justify-center align-center gap-1 w-100">
        <span className="blogTime">
          {moment(time).format("MMMM Do YYYY")} {moment(time).format("dddd")}
        </span>

        <Link to={`/blogs/${id}`} className="readBlog">
          {t("blog.read")}
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
