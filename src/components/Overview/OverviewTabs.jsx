"use client";

import { Empty, Tabs } from "antd";

export function OverviewTabs({ content_pages }) {
  const { TabPane } = Tabs;

  return (
    <Tabs className="tabs" defaultActiveKey="0">
      {content_pages?.map((tab, index) => (
        <TabPane tab={tab.title} key={index}>
          <div className="flex flex-col gap-3 py-3 justify-start items-start">
            <p className="text-2xl font-bold leading-normal text-[#0D121C]">
              {tab.title}
            </p>
            {tab?.summary ? (
              <p className="text-[#0D121C] text-base leading-normal">
                {tab?.summary}
              </p>
            ) : (
              <Empty description="Summary not found" />
            )}
          </div>

          {/* Quick Facts */}
          <div className="flex flex-col gap-3 py-3 justify-start items-start w-full">
            <p className="text-2xl font-bold leading-normal text-[#0D121C]">
              Quick Facts
            </p>
            {
              <>
                <div className="flex flex-wrap w-full">
                  {tab?.facts?.length > 0 ? (
                    tab?.facts?.map((item, index) => (
                      <div
                        key={index}
                        className="flex  flex-col md:flex-row justify-between items-center w-[50%]"
                      >
                        <div className="flex flex-col gap-1 justy-start items-start py-4 border-t border-[#E5E8EB] w-full">
                          <p className="text-[#4A699C] text-sm leading-normal">
                            {item.title}
                          </p>
                          <p className="text-[#0D121C] text-sm leading-normal">
                            {item.content}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <Empty description="Facts not found" />
                  )}
                </div>
              </>
            }
          </div>
        </TabPane>
      ))}
    </Tabs>
  );
}
