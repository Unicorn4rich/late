
// components/CourseCards.tsx
import { Card, CardBody, Progress, Avatar, Chip } from "@heroui/react";

interface CourseData {
  id: number;
  title: string;
  subtitle: string;
  category: string;
  weeksLeft: number;
  progress: number;
  progressColor: "warning" | "success" | "primary" | "default" | "secondary" | "danger";
  avatarSrc: string;
  description: string;
}

const CourseCards = () => {

  const courses: CourseData[] = [
    {
      id: 1,
      title: "Web Design",
      subtitle: "Design Learn Management System",
      category: "UI/UX Design",
      weeksLeft: 6,
      progress: 55,
      progressColor: "warning",
      avatarSrc: "/logo.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: 2,
      title: "Web Development",
      subtitle: "Design Learn Management System",
      category: "javascript",
      weeksLeft: 6,
      progress: 55,
      progressColor: "success",
      avatarSrc: "/logo.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
      id: 3,
      title: "CSS & HTML",
      subtitle: "Design Learn Management System",
      category: "UI/UX Design",
      weeksLeft: 6,
      progress: 55,
      progressColor: "primary",
      avatarSrc: "/logo.png",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    }
  ];

  return (
    <div className="container mx-auto px-4 my-10 ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {courses.map((course) => (
          <Card 
            key={course.id}
            className="w-full bg-white rounded-[24px] shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 "
          >
            <CardBody className="p-6">
              
              {/* Header */}
              <div className="mb-4">
                <h3 className="text-xl font-extrabold text-gray-900 mb-1">
                  {course.title}
                </h3>
                <p className="text-sm text-gray-400 mb-3">
                  {course.subtitle}
                </p>
                <Chip 
                  size="sm" 
                  variant="flat"
                  className="bg-gray-100 text-gray-700 text-xs"
                >
                  {course.category}
                </Chip>
              </div>

              {/* Progress Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">
                    {course.weeksLeft} Weeks Left
                  </span>
                </div>

                <Progress 
                  value={course.progress}
                  color={course.progressColor}
                  size="md"
                  className="mb-1"
                />
                
                <span className="w-full flex justify-end text-sm font-medium text-gray-900 text-right">
                    {course.progress}% Completed
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-4">
                {course.description}
              </p>

              {/* Footer with Avatar */}
              <div className="flex items-center">
                <Avatar
                  src={course.avatarSrc}
                  size="sm"
                  className="w-8 h-8"
                />
              </div>
            </CardBody>
          </Card>
        ))}
        
      </div>
    </div>
  );
};

export default CourseCards;