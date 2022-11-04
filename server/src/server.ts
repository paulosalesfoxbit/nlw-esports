import express from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'

/** 1080 => 18:00 hour*/
const convertMinutesToHour = (minutesAmount: number) => {
  const hours = Math.floor(minutesAmount / 60);
  const minutes = minutesAmount % 60;
  return `${hours}:${minutes}`;
}

/** 18:00 => 1080 minutes */
const convertHourToMinutes = (hourString: string) => {
  const [hours, minutes] = hourString.split(':').map(Number)
  const minutesAmount = (hours * 60) + minutes
  return minutesAmount
}

const app = express()
const db = new PrismaClient({
  log: ['query']
})

app.use(express.json())

// TODO: CORS colocar o dominio http://meu-domain-live.com
app.use(cors())

app.get('/games', async (_request, response) => {
  const games = await db.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })
  return response.status(200).json(games)
})

app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const ads = await db.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPaying: true,
      hourEnd: true,
      hourStart: true,
    },
    where: {
      game: {
        id: gameId
      }
    },
    orderBy: {
      createAt: 'desc'
    }
  })

  const adsFormat = ads.map(ad => ({ ...ad, weekDays: ad.weekDays.split(',') }))
  return response.status(200).json(adsFormat)
})

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id
  const ad = await db.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  })
  return response.status(200).json({ discord: ad.discord })
})

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const body = request.body

  // Validacao
  // lib zod javascript
  const ad = await db.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPaying: body.yearsPaying,
      weekDays: body.weekDays,
      discord: body.discord,
      hourEnd: convertHourToMinutes(body.hourEnd),
      hourStart: convertHourToMinutes(body.hourStart),
    }
  })
  return response.status(201).json([])
})

app.get('/ads', async (_request, response) => {
  const ads = await db.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPaying: true,
      hourEnd: true,
      hourStart: true,
    },
    orderBy: {
      createAt: 'desc'
    }
  })

  const adsFormat = ads.map(ad => ({
    ...ad,
    weekDays: ad.weekDays.split(','),
    hourStart: convertMinutesToHour(ad.hourStart),
    hourEnd: convertMinutesToHour(ad.hourEnd),
  }))
  return response.status(200).json(adsFormat)
})

app.listen(3333)