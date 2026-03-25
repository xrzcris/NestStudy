import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [careerFilter, setCareerFilter] = useState("");

  useEffect(() => {
    fetch("http://216.238.94.51:3000/api/proyectos")
      .then((res) => res.json())
      .then((data) => {
        const sorted = [...data].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
        setPosts(sorted);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredPosts = posts.filter((post) => {
    const matchesKeyword =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCareer = careerFilter
      ? post.career?.toLowerCase().includes(careerFilter.toLowerCase())
      : true;

    return matchesKeyword && matchesCareer;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-800">
      {/* Top content */}
      <div className="p-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
          Exploración
        </h1>

        {/* Search + Careers */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input
            type="text"
            placeholder="Buscar por palabra clave..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300 bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-100"
          />
          <select
            value={careerFilter}
            onChange={(e) => setCareerFilter(e.target.value)}
            className="min-w-[320px] px-4 py-2 border rounded-lg shadow-sm focus:ring focus:ring-green-300 bg-gray-200 dark:bg-gray-900 text-gray-600 dark:text-gray-100"
          >
            <option value="">Todas las carreras</option>
            <option value="Desarrollo software">Desarrollo software multiplataforma</option>
            <option value="Redes">Infraestructura de redes digitales</option>
            <option value="Negocios y mercadotecnia">Negocios y mercadotecnia</option>
            <option value="Contaduría">Contaduría</option>
            <option value="Administración">Administración</option>
            <option value="Gestión del Bienestar">Gestión del Bienestar</option>
            <option value="Turismo">Turismo</option>
            <option value="Mantenimiento">Mantenimiento Industrial</option>
            <option value="Gastronomía">Gastronomía</option>
          </select>
        </div>
      </div>

      {/* Posts Section */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800">
        <div className="grow max-w-7xl mx-auto p-8 bg-gray-300 dark:bg-gray-900">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
          Últimos proyectos
        </h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

function PostCard({ post }) {
  return (
    <Link to={`/posts/${post.id}`}>
    <div className="bg-white dark:bg-gray-700 rounded-xl shadow-black p-6 hover:shadow-lg transition">
      {post.imageUrl ? (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-40 bg-gray-200 flex items-center justify-center rounded-md mb-4">
          <span className="text-gray-500">Sin vista previa</span>
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
        {post.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-3">
        {post.description}
      </p>
    </div>
    </Link>
  );
}

export default Home;