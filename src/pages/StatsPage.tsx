import { useLeaves } from "../utils/Leave";

export default function StatsPage() {
  const leaves = useLeaves();

  return <div>Hi stats page, how are you?</div>;

  // return (
  //   <div className="m-4">
  //     <div className="flex gap-2 w-full">
  //       <Card width="w-1/2" title="Ledighet">
  //         <div className="ml-2 flex flex-col">
  //           <p>
  //             <b>{daysWithLeave} dagar</b> föräldraledighet
  //           </p>
  //           <p>
  //             (<b>{weekdaysWithLeave}</b> vardagar)
  //           </p>
  //         </div>
  //         {/* <div className="translate-x-1 translate-y-0 w-0 h-0 border-l-[15px] border-l-transparent border-b-[15px] border-b-black border-r-[15px] border-r-transparent" /> */}
  //         <div className="ml-2 mt-1 mb-2 border-transparent shadow-sm shadow-black py-1 px-2 w-max rounded-md grid grid-cols-2 gap-x-2">
  //           <p>{allocatedDates.filter((ad) => ad.pace === 1).length}</p>
  //           <p>100%</p>
  //           <p>{allocatedDates.filter((ad) => ad.pace === 0.75).length}</p>
  //           <p>75%</p>
  //           <p>{allocatedDates.filter((ad) => ad.pace === 0.5).length}</p>
  //           <p>50%</p>
  //           <p>{allocatedDates.filter((ad) => ad.pace === 0.25).length}</p>
  //           <p>25%</p>
  //         </div>
  //       </Card>
  //       <Card width="w-1/2" title="Penning">
  //         <div>
  //           <div className="ml-2 flex flex-col">
  //             <p>
  //               <b>{daysWithPayment} dagar</b> med föräldrapenning
  //             </p>
  //             <p>
  //               ({`${((daysWithPayment / 480) * 100).toPrecision(2)}% av `}
  //               <span
  //                 className="text-blue-700 font-bold cursor-default"
  //                 title="390 sjukpenningnivå + 90 lågkostnadsdagar"
  //               >
  //                 480 st
  //               </span>
  //               )
  //             </p>
  //           </div>
  //         </div>

  //         {/* <div className="translate-x-1 translate-y-0 w-0 h-0 border-l-[15px] border-l-transparent border-b-[15px] border-b-black border-r-[15px] border-r-transparent" /> */}
  //         <div className="ml-2 mt-1 mb-2 border-transparent shadow-sm shadow-black py-1 px-2 w-max rounded-md grid grid-cols-2 gap-x-2">
  //           <p>{allocatedDates.filter((ad) => ad.payment === 1).length}</p>
  //           <p>100%</p>
  //           <p>{allocatedDates.filter((ad) => ad.payment === 0.75).length}</p>
  //           <p>75%</p>
  //           <p>{allocatedDates.filter((ad) => ad.payment === 0.5).length}</p>
  //           <p>50%</p>
  //           <p>{allocatedDates.filter((ad) => ad.payment === 0.25).length}</p>
  //           <p>25%</p>
  //           <p>{allocatedDates.filter((ad) => ad.payment === 0).length}</p>
  //           <p>0%</p>
  //         </div>
  //       </Card>
  //     </div>
  //   </div>
  // );
}
