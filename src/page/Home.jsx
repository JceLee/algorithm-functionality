import { Link } from "react-router-dom";

const problems = [
  { week: "Week1", title: "CodeVerification", route: "week-1-1" },
  { week: "Week2", title: "CommentList", route: "week-2-1" },
  { week: "Week2", title: "TicketPurchase", route: "week-2-2" }, // Add new problem
];

export default function Home() {
  return (
    <div className="w-full h-full p-4">
      <h1 className="font-bold text-teal-600 text-3xl mb-6">
        알고리즘 탐험반 기능구현
      </h1>
      <ul className="space-y-4">
        {problems.map((problem, index) => (
          <li key={index} className="p-4 bg-gray-100 rounded-md shadow-md">
            <Link
              to={`/${problem.route}`}
              className="text-lg font-semibold text-teal-500 hover:underline"
            >
              {problem.week} : {problem.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
