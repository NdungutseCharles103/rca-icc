'use client';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Match } from '../utils/types/types1';
import Moment from 'react-moment';
import { useState } from 'react';
import PredictionModal from './constants/PredictionModal';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface Props extends Match {
  isGaming?: boolean;
}

const GameMatchCard = ({ awayTeam, homeTeam, stats, status, date, _id, category, isGaming }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const isNotStarted = status?.status === 'NS';
  const isFinished = status?.status === 'FT';
  const isBasketball = category === 'basketball';
  const isLive = status?.status === 'HT' || status?.status === '1H' || status?.status === '2H';
  const isForfeit = status?.status === 'FF';

  const awayScore = isBasketball ? stats?.awayTeamStats?.points : stats?.awayTeamStats?.goals;
  const homeScore = isBasketball ? stats?.homeTeamStats?.points : stats?.homeTeamStats?.goals;

  const isDueDate = new Date(date).getTime() + 1000 * 60 * 90 < new Date().getTime();
  const isToday = new Date(date).getDate() === new Date().getDate();

  return (
    <div
      //   href={`/match/${_id}`}
      className="relative flex border-2 border-gray max-w-[300px] min-w-[200px] w-full h-[120px] rounded-md hover:bg-slate-100 duration-300"
    >
      <div className="lg:p-6 p-3 flex justify-center w-full gap-y-2 flex-col">
        <div className="flex gap-2 text-center">
          <Image src={homeTeam?.logo ?? '/images/teamImage.svg'} width={20} height={10} alt={''} />
          <p className="text-slate text-xs text-start font-bold">{homeTeam?.name}</p>
        </div>
        <div className="flex gap-2 text-center">
          <Image src={awayTeam?.logo ?? '/images/teamImage2.svg'} width={20} height={10} alt={''} />
          <p className="text-slate text-xs text-start font-bold">{awayTeam?.name}</p>
        </div>
      </div>
      <span className="w-[1px] h-[80%] bg-gray mt-2"></span>
      {/* Can't play / View match result here in gaming*/}
      {isForfeit ? (
        <div className=" p-3 px-1 min-w-[80px] flex flex-col items-center justify-center">
          <span className=" text-center">{isForfeit ? 'FF' : 'FT'}</span>
          {isForfeit ? (
            <span className="text-xs font-bold text-center text-orange">Forfeit</span>
          ) : (
            <span className="text-xs font-bold text-center">
              {isToday ? 'Today' : <Moment format="MMM Do YYYY">{date}</Moment>}
            </span>
          )}
        </div>
      ) : (
        <div className=" p-3 px-1 min-w-[100px] flex flex-col gap-y-2 justify-center">
          <>
            <p className="text-xs font-bold text-center">
              {isLive ? (
                <span className=" text-green-500">live</span>
              ) : isToday ? (
                'Today'
              ) : (
                <Moment format="MMM Do YYYY">{date}</Moment>
              )}
            </p>
            <div className="flex flex-col leading-tight">
              <span className=" text-sm text-center">
                <Moment format="LT">{date}</Moment>
              </span>
              <button
                onClick={() => setIsOpen(true)}
                className="  right-2 top-2 text-white bg-[#2076F8] hover:bg-white duration-200 border-2 border-blue hover:text-blue rounded-3xl text-sm py-1 px-2  "
              >
                {isNotStarted ? 'Play' : 'View'}
              </button>
              <PredictionModal isOpen={isOpen} closeModal={() => setIsOpen(false)} matchId={_id} />
            </div>
          </>
        </div>
      )}
    </div>
  );
};

export default GameMatchCard;