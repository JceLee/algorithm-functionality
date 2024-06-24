import { formatTimestamp } from "../../lib/utils/formatTimestamp.js";

const comments = [
  {
    id: 1,
    text: "이것은 첫 번째 댓글입니다.",
    timestamp: "2024-06-23T12:00:00Z",
  },
  {
    id: 2,
    text: "이것은 두 번째 댓글입니다.",
    timestamp: "2024-06-23T11:59:00Z",
  },
  {
    id: 3,
    text: "이것은 세 번째 댓글입니다.",
    timestamp: "2024-06-22T10:00:00Z",
  },
  {
    id: 4,
    text: "이것은 네 번째 댓글입니다.",
    timestamp: "2024-06-16T09:00:00Z",
  },
  {
    id: 5,
    text: "이것은 다섯 번째 댓글입니다.",
    timestamp: "2024-06-24T08:30:00Z",
  },
  {
    id: 6,
    text: "이것은 여섯 번째 댓글입니다.",
    timestamp: "2024-06-24T07:45:00Z",
  },
  {
    id: 7,
    text: "이것은 일곱 번째 댓글입니다.",
    timestamp: "2024-06-23T23:00:00Z",
  },
];

const CommentList = () => {
  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="p-4 bg-white rounded-md shadow-lg border border-gray-200"
        >
          <p className="text-lg font-semibold text-gray-800">{comment.text}</p>
          <span className="text-sm text-gray-500">
            {formatTimestamp(comment.timestamp)}
          </span>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
