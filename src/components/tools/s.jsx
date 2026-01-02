import React, { useState, useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';
import questionsData from '../../data/s.json'; 


const QuizWrapper = styled.div`
  font-family: 'Segoe UI', 'Roboto', sans-serif;
  background-color: #0f0e17;
  color: #fffffe;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  width: 100%;
  box-sizing: border-box;

  * { box-sizing: border-box; }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Card = styled.div`
  background: #232946;
  width: 100%;
  max-width: 700px;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.5s ease-out;
  border: 1px solid #232946;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; height: 6px;
    background: linear-gradient(90deg, #ff8906, #f25f4c);
  }
`;

const Title = styled.h1`
  color: #fffffe;
  font-size: 2rem;
  margin: 0 0 0.5rem 0;
  text-align: center;
`;

const Subtitle = styled.p`
  color: #a7a9be;
  text-align: center;
  margin-bottom: 2rem;
`;

// Input & Mode Selectors
const ModeContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
  flex-wrap: wrap;
`;

const ModeButton = styled.button`
  flex: 1;
  min-width: 80px;
  padding: 12px;
  background: ${props => props.active ? '#7f5af0' : '#16161a'};
  color: ${props => props.active ? '#fffffe' : '#a7a9be'};
  border: 1px solid ${props => props.active ? '#7f5af0' : '#2e3452'};
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
  font-weight: bold;
  font-size: 0.9rem;

  &:hover {
    background: ${props => !props.active && '#232946'};
    border-color: #7f5af0;
  }
`;

const CustomInput = styled.input`
  width: 100%;
  padding: 12px;
  background: #16161a;
  border: 2px solid #2e3452;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  margin-bottom: 10px;
  text-align: center;

  &:focus {
    outline: none;
    border-color: #ff8906;
  }
`;

const StyledSelect = styled.select`
  width: 100%;
  padding: 12px;
  background: #16161a;
  border: 2px solid #2e3452;
  border-radius: 8px;
  color: white;
  font-size: 1rem;
  margin-bottom: 10px;
  cursor: pointer;

  &:focus {
    outline: none;
    border-color: #ff8906;
  }
`;

// Action Buttons
const Button = styled.button`
  background: #ff8906;
  color: #0f0e17;
  border: none;
  padding: 14px 24px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s, background 0.2s;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background: #ff9f1c;
    transform: translateY(-2px);
  }

  &:active {
    transform: scale(0.98);
  }

  ${props => props.secondary && css`
    background: transparent;
    border: 2px solid #a7a9be;
    color: #fffffe;
    &:hover {
      background: rgba(255, 255, 255, 0.1);
      transform: none;
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none;
  }
`;

// Quiz Interface
const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #a7a9be;
`;

const QuestionText = styled.h3`
  font-size: 1.2rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  white-space: pre-wrap;
  background: #16161a;
  padding: 15px;
  border-radius: 8px;
  border-left: 4px solid #7f5af0;
`;

const OptionButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 2px solid ${props => props.selected ? '#7f5af0' : '#232946'};
  background: ${props => props.selected ? 'rgba(127, 90, 240, 0.2)' : '#232946'};
  color: ${props => props.selected ? '#fffffe' : '#b8c1ec'};
  text-align: left;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  position: relative;

  &:hover {
    background: ${props => !props.selected && '#2e3452'};
    border-color: #7f5af0;
  }
`;

const NavContainer = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

// Stats
const StatsRow = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const StatCard = styled.div`
  flex: 1;
  background: #16161a;
  padding: 15px;
  border-radius: 8px;
  text-align: center;
  
  h4 { font-size: 1.8rem; margin: 0; color: #ff8906; }
  span { font-size: 0.8rem; color: #a7a9be; text-transform: uppercase; letter-spacing: 1px; }
`;

// History List Styles
const HistoryContainer = styled.div`
  margin-top: 25px;
  border-top: 1px solid #2e3452;
  padding-top: 15px;
  width: 100%;
`;

const HistoryHeader = styled.h4`
  color: #a7a9be;
  margin: 0 0 10px 0;
  font-size: 0.95rem;
  display: flex;
  justify-content: space-between;
`;

const ScrollArea = styled.div`
  max-height: 200px;
  overflow-y: auto;
  
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-track { background: #16161a; }
  &::-webkit-scrollbar-thumb { background: #2e3452; border-radius: 3px; }
`;

const HistoryItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #16161a;
  margin-bottom: 8px;
  padding: 10px 15px;
  border-radius: 6px;
  font-size: 0.9rem;
  border-left: 3px solid ${props => props.pass ? '#2cb67d' : '#e53170'};
`;

const Tag = styled.span`
  background: #232946;
  color: #b8c1ec;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.75rem;
  margin-left: 8px;
  border: 1px solid #2e3452;
`;

// --- 2. HELPER FUNCTIONS ---

const shuffleArray = (array) => {
  const newArr = [...array];
  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
};

// --- 3. MAIN COMPONENT ---

export default function S() {
  // Extract Unique Categories from JSON
  const categories = ['Pilih Kategori...', ...new Set(questionsData.map(q => q.category))];

  // App State
  const [view, setView] = useState('menu'); 
  const [mode, setMode] = useState('sprint'); // sprint, marathon, custom, category
  const [customCount, setCustomCount] = useState(10);
  const [selectedCategory, setSelectedCategory] = useState(categories[1] || '');
  
  // Quiz State
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); 
  
  // Stats State
  const [stats, setStats] = useState({
    sprint: { highScore: 0, totalGames: 0, history: [] },
    marathon: { highScore: 0, totalGames: 0, history: [] },
    custom: { highScore: 0, totalGames: 0, history: [] },
    category: { highScore: 0, totalGames: 0, history: [] } // New Stat Bucket
  });

  // Load Stats
  useEffect(() => {
    // Ganti key ke V3 biar bersih karena ada struktur baru
    const saved = localStorage.getItem('quiz_stats_v3');
    if (saved) {
      setStats(JSON.parse(saved));
    }
  }, []);

  // Filter & Count Logic
  const getQuestionsPool = () => {
    if (mode === 'category') {
      return questionsData.filter(q => q.category === selectedCategory);
    }
    return questionsData;
  };

  const getQuestionCount = (poolLength) => {
    if (mode === 'sprint') return Math.min(20, poolLength);
    if (mode === 'marathon') return poolLength;
    if (mode === 'category') return poolLength; // Kategori = kerjakan semua soal di kategori itu
    return Math.min(Math.max(parseInt(customCount) || 10, 1), poolLength);
  };

  const startQuiz = () => {
    // 1. Filter based on mode
    let pool = getQuestionsPool();
    
    // 2. Determine count
    const count = getQuestionCount(pool.length);
    
    // 3. Shuffle Pool
    const shuffledPool = shuffleArray(pool);

    // 4. Slice & Shuffle Options
    const sessionQuestions = shuffledPool.slice(0, count).map(q => ({
      ...q,
      options: shuffleArray([q.correct_answer, ...q.incorrect_answers])
    }));

    setActiveQuestions(sessionQuestions);
    setCurrentIndex(0);
    setUserAnswers({});
    setView('quiz');
  };

  const handleOptionSelect = (optIndex) => {
    setUserAnswers(prev => ({
      ...prev,
      [currentIndex]: optIndex
    }));
  };

  const finishQuiz = () => {
    let correctCount = 0;
    activeQuestions.forEach((q, idx) => {
      const selectedOptIndex = userAnswers[idx];
      if (selectedOptIndex !== undefined && q.options[selectedOptIndex] === q.correct_answer) {
        correctCount++;
      }
    });

    const totalQ = activeQuestions.length;
    const percentage = Math.round((correctCount / totalQ) * 100);

    // Tagging history with Category Name or Mode
    const sessionTag = mode === 'category' ? selectedCategory : mode.toUpperCase();

    const historyItem = {
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute:'2-digit' }),
      score: correctCount,
      total: totalQ,
      percentage: percentage,
      tag: sessionTag
    };

    const currentModeStats = stats[mode];
    const newStats = {
      ...stats,
      [mode]: {
        totalGames: currentModeStats.totalGames + 1,
        highScore: Math.max(currentModeStats.highScore, correctCount),
        history: [historyItem, ...currentModeStats.history].slice(0, 50) 
      }
    };

    setStats(newStats);
    localStorage.setItem('quiz_stats_v3', JSON.stringify(newStats));
    setView('result');
  };

  // --- RENDERING ---

  const renderMenu = () => {
    const currentStats = stats[mode];
    const pool = getQuestionsPool();
    const countDisplay = getQuestionCount(pool.length);

    return (
      <Card>
        <Title>OPREC ASLAB 2026</Title>
        <Subtitle>Pilih Mode Latihan</Subtitle>

        <ModeContainer>
          <ModeButton active={mode === 'sprint'} onClick={() => setMode('sprint')}>
            SPRINT
          </ModeButton>
          <ModeButton active={mode === 'marathon'} onClick={() => setMode('marathon')}>
            MARATHON
          </ModeButton>
          <ModeButton active={mode === 'category'} onClick={() => setMode('category')}>
            KATEGORI
          </ModeButton>
          <ModeButton active={mode === 'custom'} onClick={() => setMode('custom')}>
            CUSTOM
          </ModeButton>
        </ModeContainer>

        {/* Dynamic Controls based on Mode */}
        <div style={{marginBottom: 15, background: '#16161a', padding: '15px', borderRadius: '8px', border: '1px solid #2e3452'}}>
          
          {mode === 'custom' && (
             <>
              <p style={{fontSize: '0.9rem', color: '#a7a9be', margin: '0 0 8px 0'}}>Jumlah Soal (Max {pool.length}):</p>
              <CustomInput 
                type="number" 
                min="1" 
                max={pool.length} 
                value={customCount} 
                onChange={(e) => setCustomCount(e.target.value)} 
              />
             </>
          )}

          {mode === 'category' && (
            <>
              <p style={{fontSize: '0.9rem', color: '#a7a9be', margin: '0 0 8px 0'}}>Pilih Kategori:</p>
              <StyledSelect 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map((cat, idx) => (
                  <option key={idx} value={cat} disabled={cat === 'Pilih Kategori...'}>{cat}</option>
                ))}
              </StyledSelect>
            </>
          )}

          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '5px', color: '#b8c1ec', fontSize: '0.9rem'}}>
             <span>Total Soal Akan Dikerjakan:</span>
             <strong style={{color: '#ff8906', fontSize: '1.1rem'}}>{countDisplay} Soal</strong>
          </div>
        </div>

        <StatsRow>
          <StatCard>
            <h4>{currentStats.totalGames}</h4>
            <span>Games Played</span>
          </StatCard>
          <StatCard>
            <h4>{currentStats.highScore}</h4>
            <span>High Score</span>
          </StatCard>
        </StatsRow>

        <Button onClick={startQuiz}>MULAI UJIAN</Button>

        {/* History Section */}
        <HistoryContainer>
          <HistoryHeader>
            <span>Riwayat Latihan ({mode.toUpperCase()})</span>
            <span>Nilai</span>
          </HistoryHeader>
          <ScrollArea>
            {currentStats.history.length === 0 ? (
               <p style={{textAlign: 'center', color: '#555', fontSize: '0.8rem', fontStyle: 'italic'}}>Belum ada data riwayat.</p>
            ) : (
               currentStats.history.map((h, i) => (
                <HistoryItem key={i} pass={h.percentage >= 70}>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <div style={{display:'flex', alignItems: 'center'}}>
                      <span style={{color: '#fffffe'}}>{h.date}</span>
                      {mode === 'category' && <Tag>{h.tag}</Tag>}
                    </div>
                    <span style={{fontSize: '0.75rem', color:'#a7a9be', marginTop: '2px'}}>
                      {h.percentage}% • {h.percentage >= 70 ? 'Lulus' : 'Belum Lulus'}
                    </span>
                  </div>
                  <strong style={{color: h.percentage >= 70 ? '#2cb67d' : '#e53170'}}>
                    {h.score} / {h.total}
                  </strong>
                </HistoryItem>
               ))
            )}
          </ScrollArea>
        </HistoryContainer>

      </Card>
    );
  };

  const renderQuiz = () => {
    const question = activeQuestions[currentIndex];
    const total = activeQuestions.length;
    const selectedAnswerIndex = userAnswers[currentIndex];

    return (
      <Card>
        <TopBar>
          <span style={{color: '#ff8906', fontWeight: 'bold'}}>Soal {currentIndex + 1} / {total}</span>
          <span style={{background: '#7f5af0', color: 'white', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem'}}>
            {question.category}
          </span>
        </TopBar>

        <div style={{height: '4px', background: '#16161a', width: '100%', marginBottom: '20px', borderRadius: '2px'}}>
          <div style={{
            height: '100%', 
            background: '#ff8906', 
            width: `${((currentIndex + 1) / total) * 100}%`,
            transition: 'width 0.3s ease'
          }}/>
        </div>

        <QuestionText>{question.question}</QuestionText>

        <div>
          {question.options.map((opt, idx) => (
            <OptionButton 
              key={idx} 
              selected={selectedAnswerIndex === idx}
              onClick={() => handleOptionSelect(idx)}
            >
              <span style={{
                display: 'inline-block', 
                width: '24px', 
                color: selectedAnswerIndex === idx ? '#fff' : '#7f5af0', 
                fontWeight: 'bold'
              }}>
                {String.fromCharCode(65 + idx)}.
              </span> 
              {opt}
            </OptionButton>
          ))}
        </div>

        <NavContainer>
          <Button 
            secondary 
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex === 0}
          >
            ← Sebelumnya
          </Button>
          
          {currentIndex === total - 1 ? (
            <Button onClick={finishQuiz} style={{background: '#2cb67d'}}>
              Selesai & Lihat Nilai →
            </Button>
          ) : (
            <Button onClick={() => setCurrentIndex(prev => prev + 1)}>
              Selanjutnya →
            </Button>
          )}
        </NavContainer>
      </Card>
    );
  };

  const renderResult = () => {
    let correctCount = 0;
    activeQuestions.forEach((q, idx) => {
      const selectedOptIndex = userAnswers[idx];
      if (selectedOptIndex !== undefined && q.options[selectedOptIndex] === q.correct_answer) {
        correctCount++;
      }
    });
    
    const percentage = Math.round((correctCount / activeQuestions.length) * 100);
    const isPass = percentage >= 70;

    return (
      <Card style={{textAlign: 'center'}}>
        <Title>{isPass ? 'LULUS! 🎉' : 'BELUM LULUS 😅'}</Title>
        <Subtitle>Hasil Latihan Mode: <b style={{color: '#ff8906'}}>{mode.toUpperCase()}</b></Subtitle>
        
        {/* Info Tambahan di Result */}
        {mode === 'category' && (
          <div style={{marginBottom: '10px', color: '#b8c1ec', fontSize: '0.9rem'}}>
            Kategori: <span style={{color: 'white', fontWeight: 'bold'}}>{selectedCategory}</span>
          </div>
        )}

        <div style={{margin: '30px 0'}}>
          <h1 style={{fontSize: '5rem', margin: 0, color: isPass ? '#2cb67d' : '#e53170'}}>
            {correctCount}
          </h1>
          <p style={{color: '#a7a9be', fontSize: '1.2rem'}}>dari {activeQuestions.length} soal</p>
        </div>

        <div style={{display: 'flex', gap: '10px'}}>
            <Button onClick={startQuiz}>Ulangi Latihan</Button>
            <Button secondary onClick={() => setView('menu')}>Ke Menu Utama</Button>
        </div>
      </Card>
    );
  };

  return (
    <QuizWrapper>
      {view === 'menu' && renderMenu()}
      {view === 'quiz' && renderQuiz()}
      {view === 'result' && renderResult()}
    </QuizWrapper>
  );
}