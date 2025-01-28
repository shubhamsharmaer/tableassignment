import React, { useState } from "react";
import SubTable from "./SubTable"; 

const MainTable = ({ departments, tasks }) => {
  // Group tasks by department
  const groupedTasks = tasks.reduce((acc, task) => {
    const dept = task.department || "Unassigned";
    // console.log("Department:", task);
    if (!acc[dept]) acc[dept] = [];
    acc[dept].push(task);
    return acc;
  }, {});
  const [expandedDepartments, setExpandedDepartments] = useState({});
  const [taskCounts, setTaskCounts] = useState({});

  const getTaskCounts = (tasks) => {
    return tasks.reduce(
      (counts, task) => {
        counts[task.status] = (counts[task.status] || 0) + 1;
        return counts;
      },
      { "Total Task": 0, Today: 0, Recurring: 0, "In Progress": 0, "In Pipeline": 0, "For Review": 0, Completed: 0 }
    );
  };

  const toggleDepartment = (dept) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [dept]: !prev[dept],
    }));
  };

  const handleTaskCountChange = (count) => {
    setTaskCounts((prev) => ({
      ...prev,
      [count]: count,
    }));
  };

  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-[#9dceb2]">
          <tr>
            <th className="border border-gray-300 px-4 py-2">S.No</th>
            <th className="border border-gray-300 px-4 py-2">Department</th>
            <th className="border border-gray-300 px-4 py-2">Total Tasks</th>
          </tr>
        </thead>
        <tbody className="bg-[#b5dac5]">
          {Object.entries(departments).map(([dept, subDept], deptIndex) => (
            <React.Fragment key={dept}>
              
              <tr
                className="bg-gray-100 cursor-pointer hover:bg-gray-200"
                onClick={() => toggleDepartment(dept)}
              >
                <td className="border border-gray-300 px-4 py-2">{deptIndex + 1}</td>
                <td className="border border-gray-300 px-4 py-2 font-bold">{dept}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {/* {groupedTasks[dept] ? groupedTasks[dept].length : 0} */}
                  {taskCounts[dept] || 0}
                </td>
              </tr>

              {expandedDepartments[dept] && (
                <tr>
                  <td colSpan={3} className="p-4">
                    {/* {console.log(groupedTasks[dept])} */}                    
                        <SubTable tasks={groupedTasks[subDept] || []} onTaskCountChange={handleTaskCountChange} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MainTable;
