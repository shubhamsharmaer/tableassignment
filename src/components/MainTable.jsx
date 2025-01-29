import React, { useState, useEffect } from "react";
import SubTable from "./SubTable";

const MainTable = ({ departments, tasks }) => {
  const [expandedDepartments, setExpandedDepartments] = useState({});
  const [taskCounts, setTaskCounts] = useState({});

  useEffect(() => {
    const processData = () => {
      try {
        // Map subdepartments to super departments
        const subToSuperMap = {};
        Object.entries(departments).forEach(([superDept, subDepts]) => {
          subDepts.forEach((subDept) => {
            subToSuperMap[subDept] = superDept;
          });
        });

        const superDeptTaskCount = {};
        tasks.forEach((task) => {
          const subDept = task.department || task.sub_department;
          const superDept = subToSuperMap[subDept];

          if (superDept) {
            superDeptTaskCount[superDept] = (superDeptTaskCount[superDept] || 0) + 1;
          }
        });

        setTaskCounts(superDeptTaskCount);
      } catch (error) {
        console.error("Error processing data:", error);
      }
    };

    processData();
  }, [departments, tasks]);

  const toggleDepartment = (dept) => {
    setExpandedDepartments((prev) => ({
      ...prev,
      [dept]: !prev[dept],
    }));
  };

  const handleTaskCountChange = (count) => {
    console.log("Total tasks:", count);
  };
  

  return (
    <div className="p-4">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-[#9dceb2]">
          <tr>
            <th className="border border-gray-300 px-4 py-2">S.No</th>
            <th className="border border-gray-300 px-4 py-2">Super Department</th>
            <th className="border border-gray-300 px-4 py-2">Total Tasks</th>
          </tr>
        </thead>
        <tbody className="bg-[#b5dac5]">
          {Object.entries(departments).map(([superDept, subDepts], deptIndex) => (
            <React.Fragment key={superDept}>
              <tr
                className="bg-gray-100 cursor-pointer hover:bg-gray-200"
                onClick={() => toggleDepartment(superDept)}
              >
                <td className="border border-gray-300 px-4 py-2">{deptIndex + 1}</td>
                <td className="border border-gray-300 px-4 py-2 font-bold">{superDept}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {taskCounts[superDept] || 0}
                </td>
              </tr>

              {expandedDepartments[superDept] && (
                <tr>
                  <td colSpan={3} className="p-4">
                    <SubTable tasks={subDepts.flatMap(subDept => tasks.filter(task => task.department === subDept))} onTaskCountChange={handleTaskCountChange} />
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
