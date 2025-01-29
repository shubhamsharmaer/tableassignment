import React, { useState, useEffect } from "react";

const SubTable = ({ tasks, onTaskCountChange }) => {
  
  const groupedTasks = tasks.reduce((acc, task) => {
    const subDept = task.department || "General";
    if (!acc[subDept]) acc[subDept] = [];
    acc[subDept].push(task);
    return acc;
  }, {});

  const [expandedSubDepartments, setExpandedSubDepartments] = useState({});

  useEffect(() => {
    onTaskCountChange(tasks.length);
  }, [tasks, onTaskCountChange]);

  const toggleSubDepartment = (subDept) => {
    setExpandedSubDepartments((prev) => ({
      ...prev,
      [subDept]: !prev[subDept],
    }));
  };

  return (
    <table className="w-full border-collapse border border-gray-300 mt-2">
      <thead className="bg-[#cee7d9]">
        <tr>
          <th className="border border-gray-300 px-4 py-2">S.No</th>
          <th className="border border-gray-300 px-4 py-2">Sub-Department</th>
          <th className="border border-gray-300 px-4 py-2">Total Tasks</th>
          <th className="border border-gray-300 px-4 py-2">
            <div className="flex justify-center items-center w-full gap-2">
              <div className="block h-2 w-2 rounded-full bg-green-500"></div>
              Today
            </div>
          </th>
          <th className="border border-gray-300 px-4 py-2">
            <div className="flex justify-center items-center w-full gap-2">
              <div className="block h-2 w-2 rounded-full bg-red-500"></div>
              Recurring
            </div>
          </th>
          <th className="border border-gray-300 px-4 py-2">
            <div className="flex justify-center items-center w-full gap-2">
              <div className="block h-2 w-2 rounded-full bg-yellow-500"></div>
              In Progress
            </div>
          </th>
          <th className="border border-gray-300 px-4 py-2">
            <div className="flex justify-center items-center w-full gap-2">
              <div className="block h-2 w-2 rounded-full bg-[#50e0d2]"></div>
              In Pipeline
            </div>
          </th>
          <th className="border border-gray-300 px-4 py-2">
            <div className="flex justify-center items-center w-full gap-2">
              <div className="block h-2 w-2 rounded-full bg-[#2e8eca]"></div>
              For Review
            </div>
          </th>
          <th className="border border-gray-300 px-4 py-2">
            <div className="flex justify-center items-center w-full gap-2">
              <div className="block h-2 w-2 rounded-full bg-[#979797]"></div>
              Unassigned
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(groupedTasks).map(([subDept, tasks], index) => {
          const taskCounts = tasks.reduce(
            (counts, task) => {
              counts[task.status] = (counts[task.status] || 0) + 1;
              return counts;
            },
            {
              Today: 0,
              Recurring: 0,
              "In Progress": 0,
              "In Pipeline": 0,
              "For Review": 0,
              Unassigned: 0,
            }
          );

          return (
            <React.Fragment key={subDept}>
              <tr
                className="cursor-pointer bg-[#e6f3ec]"
                onClick={() => toggleSubDepartment(subDept)}
              >
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{subDept}</td>
                <td className="border border-gray-300 px-4 py-2">{tasks.length}</td>
                <td className="border border-gray-300 px-4 py-2">{taskCounts.Today}</td>
                <td className="border border-gray-300 px-4 py-2">{taskCounts.Recurring}</td>
                <td className="border border-gray-300 px-4 py-2">{taskCounts["In Progress"]}</td>
                <td className="border border-gray-300 px-4 py-2">{taskCounts["In Pipeline"]}</td>
                <td className="border border-gray-300 px-4 py-2">{taskCounts["For Review"]}</td>
                <td className="border border-gray-300 px-4 py-2">{taskCounts.Unassigned}</td>
              </tr>
              {expandedSubDepartments[subDept] && (
                <tr>
                  <td colSpan={9}>
                    <table className="w-full border-collapse border border-gray-300 mt-2">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-4 py-2">Status</th>
                          <th className="border border-gray-300 px-4 py-2">Task</th>
                          <th className="border border-gray-300 px-4 py-2">Next Step</th>
                          <th className="border border-gray-300 px-4 py-2">Assigned To</th>
                          <th className="border border-gray-300 px-4 py-2">Impact</th>
                          <th className="border border-gray-300 px-4 py-2">Duration</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((task) => (
                          <tr key={task._id.$oid}>
                            <td className="border border-gray-300 px-4 py-2">{task.status}</td>
                            <td className="border border-gray-300 px-4 py-2">{task.task_description}</td>
                            <td className="border border-gray-300 px-4 py-2">{task.nextstep || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{task.assigned_to || "Unassigned"}</td>
                            <td className="border border-gray-300 px-4 py-2">{task.impact || "N/A"}</td>
                            <td className="border border-gray-300 px-4 py-2">{task.priority || "N/A"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default SubTable;
