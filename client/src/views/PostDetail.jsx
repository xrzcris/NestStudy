import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch post + comments together
  useEffect(() => {
    setPost(null);
    setComments([]);

    fetch(`http://216.238.94.51:3000/api/proyectos/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data);
        setComments(data.comments || []);
      })
      .catch((err) => console.error(err));
  }, [id]);

  // Fetch author data once post is loaded
  useEffect(() => {
    if (post?.studentId) {
      fetch(`http://216.238.94.51:3000/api/auth/${post.studentId}`)
        .then((res) => res.json())
        .then((data) => setAuthor(data))
        .catch((err) => console.error(err));
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEntry = {
      projectId: id,
      studentId: 0, // placeholder until login/token is ready
      content: newComment,
    };

    fetch("http://216.238.94.51:3000/api/colaboraciones", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newEntry),
    })
      .then((res) => res.json())
      .then((saved) => {
        setComments([...comments, saved]);
        setNewComment("");
      })
      .catch((err) => console.error(err));
  };

  if (!post) return <div className="p-8">Cargando...</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-800 pb-20">
      <div className="grow max-w-7xl mx-auto p-12 bg-gray-300 dark:bg-gray-900 rounded-lg">
        {/* Back button */}
        <Link
          to="/home"
          className="text-green-600 dark:text-green-400 underline mb-6 inline-block"
        >
          ← Volver a Home
        </Link>

        {/* Post Card */}
        <div className="bg-white dark:bg-gray-700 rounded-lg p-6 shadow mb-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left side: author + image */}
          <div>
            {author && (
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                {author.name}
              </p>
            )}
            <div className="w-full h-64">
              {post.imageUrl ? (
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover rounded-md"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center rounded-md">
                  <span className="text-gray-500">Sin vista previa</span>
                </div>
              )}
            </div>
          </div>

          {/* Right side: post info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
              {post.title}
            </h1>
            <p className="text-gray-700 dark:text-gray-300 mb-1">
              Carrera: {post.career}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              {new Date(post.createdAt).toLocaleString()}
            </p>
            <p className="text-gray-800 dark:text-gray-200 mb-4">{post.description}</p>

            {/* Attachments */}
            {post.files && post.files.length > 0 && (
              <div className="mt-2">
                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Archivos adjuntos:
                </h3>
                <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
                  {post.files.map((file, idx) => (
                    <li key={idx}>
                      <a
                        href={file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-600 dark:text-green-400 underline"
                      >
                        {file.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-400 dark:border-gray-600 mb-8" />

        {/* Comment Form */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Responde a esta publicación
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Escribe tu comentario aquí..."
            className="w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-200 dark:bg-gray-900 text-gray-700 dark:text-gray-100"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
          >
            Publicar comentario
          </button>
        </form>

        {/* Comments */}
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">
          Comentarios
        </h2>
        <div className="space-y-4 mb-8">
          {comments.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400">No hay comentarios aún.</p>
          ) : (
            comments.map((c) => (
              <div
                key={c.id}
                className="bg-white dark:bg-gray-700 rounded-lg p-4 shadow"
              >
                <p className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-1">
                  estudiante #{c.studentId}
                </p>
                <p className="text-gray-800 dark:text-gray-200 mb-2">{c.content}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {new Date(c.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default PostDetail;