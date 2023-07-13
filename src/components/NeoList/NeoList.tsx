import { useEffect, useState, useMemo } from 'react';
import {getNeo} from '../../api/Neo.ts';
import { Card, CardActionArea, CardContent, CardMedia } from '@mui/material';
import Typography from '@mui/material/Typography';
import { AggregatedNeoData } from '../../types/AggregatedNeoData.ts';
import { v4 as uuidv4 } from 'uuid';
import {
  formatDate,
  getClosestNeo,
  getFastestNeo,
  getHazardousAsteroidAmount,
  getMaxDiameter
} from '../../utils/Neo.ts';

export const NeoList = () => {
  const [neo, setNeo] = useState<AggregatedNeoData[]>([]);
  const [highestHazard, setHighestHazard] = useState<string[]>([]);
  const currentDate = useMemo(() => new Date(), []);
  const [date, setDate] = useState(() => formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)))

  const loadNeo = async () => {
    try {
      const neoResponse = await getNeo(date);
      const neoArray = neoResponse.near_earth_objects[date];
      const neoData = {
        id: uuidv4(),
        closest_distance: getClosestNeo(neoArray),
        fastest_neo: getFastestNeo(neoArray),
        max_diameter: getMaxDiameter(neoArray),
        hazardousAsteroidAmount: getHazardousAsteroidAmount(neoArray),
        created_at: date,
      }

      if (neo.length === 6) {
        return setNeo([...neo.slice(1), neoData])
      }

      setNeo([...neo, neoData])
    } catch {
      throw new Error('Unable to load Neo');
    } finally {
      incrementDate();
    }
  }

  const getCardColor = (id: string) => {
    return highestHazard.includes(id) ? 'pink' : '#fff';
  };

  const incrementDate = () => {
    const newDate = new Date(date);
    const interval = setInterval(() => {

      if (currentDate.getDate() === newDate.getDate()) {
        setDate(formatDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)));
        clearInterval(interval);
      } else {
        newDate.setDate(newDate.getDate() + 1);
        setDate(formatDate(newDate));
        clearInterval(interval);
      }
    }, 5000);
  }

  useEffect(() => {
    const sortedNeo = [...neo].sort((firstNeo, secondNeo) => {
      return secondNeo.hazardousAsteroidAmount - firstNeo.hazardousAsteroidAmount;
    }).map(neoItem => {
      return neoItem.id;
    }).slice(0, 2);

    setHighestHazard(sortedNeo);
  }, [neo]);

  useEffect(() => {
    void loadNeo();
  }, [date]);

  return (
    <div>
      {neo.length ? (
        <div className="neo-list">
          {neo.map(neoItem => (
            <Card
              sx={{ width: '30%' }}
              key={neoItem.id}
              style={{ backgroundColor: getCardColor(neoItem.id)}}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image="https://foni.club/uploads/posts/2023-01/1674522322_foni-club-p-meteor-art-4.png"
                  alt="Asteroid"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {neoItem.created_at}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`Miss Distance: ${neoItem.closest_distance}`}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {`Relative Velocity: ${neoItem.fastest_neo}`}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {`Potentially hazardous asteroid: ${neoItem.hazardousAsteroidAmount}`}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {`Max diameter:  ${neoItem.max_diameter}`}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </div>
      ): (
        <h1>No data</h1>
      )}
    </div>
  );
};
