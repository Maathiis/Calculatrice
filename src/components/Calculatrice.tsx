'use client';

import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  calculate,
  getHistory,
  saveHistory,
  clearHistory,
} from '../utils/calculatriceUtils';

type Operation = '+' | '-' | '*' | '/' | null;

type HistoryEntry = {
  calculation: string;
  result: string;
  timestamp: Date;
};

export default function Calculator() {
  const [display, setDisplay] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] =
    useState<boolean>(false);
  const [history, setHistory] = useState<HistoryEntry[]>(getHistory());
  const [historyResultToUse, setHistoryResultToUse] = useState<string | null>(
    null,
  );
  const [showHistory, setShowHistory] = useState<boolean>(false);

  // Effect to handle setting display from history result
  useEffect(() => {
    if (historyResultToUse !== null) {
      setDisplay(historyResultToUse);
      setFirstOperand(Number.parseFloat(historyResultToUse));
      setOperation(null);
      setWaitingForSecondOperand(true);
      setHistoryResultToUse(null); // Reset the state
    }
  }, [historyResultToUse]);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplay(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForSecondOperand) {
      setDisplay('0.');
      setWaitingForSecondOperand(false);
      return;
    }

    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClearHistory = () => {
    setHistory(clearHistory());
  };

  const clearDisplay = () => {
    setDisplay('0');
    setFirstOperand(null);
    setOperation(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperation: Operation) => {
    const inputValue = Number.parseFloat(display);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operation) {
      const result = calculate(`${firstOperand} ${operation} ${inputValue}`);
      setDisplay(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperation(nextOperation);
  };

  const handleEquals = () => {
    if (firstOperand === null || operation === null) {
      return;
    }

    const inputValue = Number.parseFloat(display);
    const result = calculate(`${firstOperand} ${operation} ${inputValue}`);

    // Format the calculation for history
    const calculationText = `${firstOperand} ${operation} ${inputValue}`;

    // Create new history entry
    const newEntry = {
      calculation: calculationText,
      result: String(result),
      timestamp: new Date(),
    };

    // Add to history
    const updatedHistory = [newEntry, ...history];
    setHistory(updatedHistory);

    // Save to localStorage
    saveHistory(updatedHistory);

    setDisplay(String(result));
    setFirstOperand(result);
    setOperation(null);
    setWaitingForSecondOperand(true);
  };

  const handleBackspace = () => {
    if (
      display.length === 1 ||
      (display.length === 2 && display.startsWith('-'))
    ) {
      setDisplay('0');
    } else {
      setDisplay(display.slice(0, -1));
    }
  };

  const handlePlusMinus = () => {
    setDisplay(display.startsWith('-') ? display.slice(1) : '-' + display);
  };

  const handlePercent = () => {
    const value = Number.parseFloat(display);
    setDisplay(String(value / 100));
  };

  const toggleHistory = () => {
    setShowHistory(!showHistory);
  };

  const handleHistoryItemClick = (result: string) => {
    setHistoryResultToUse(result);
  };

  return (
    <div className="flex justify-center items-center min-h-[500px] p-4">
      <Card className="shadow-lg">
        <CardHeader className="bg-primary text-primary-foreground rounded-t-lg flex flex-row justify-between items-center bg-zinc-800">
          <CardTitle className="text-xl text-white">Calculator</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleHistory}
            className="text-primary-foreground hover:bg-primary/90 text-white hover:text-gray-200"
          >
            {showHistory ? (
              <ChevronRight className="mr-1" />
            ) : (
              <ChevronLeft className="mr-1" />
            )}
            {showHistory ? 'Hide History' : 'Show History'}
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Calculatrice */}
            <div className="w-full">
              <div className="bg-muted p-4 rounded-md mb-4 text-right">
                <div className="text-3xl font-mono tracking-wider overflow-x-auto whitespace-nowrap bg-gray-100 rounded-md p-2">
                  {display}
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                <Button
                  variant="outline"
                  onClick={clearDisplay}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 bg-red-500 text-white hover:bg-red-600"
                >
                  C
                </Button>
                <Button
                  variant="outline"
                  onClick={handleBackspace}
                  className="hover:bg-gray-400"
                >
                  ⌫
                </Button>
                <Button
                  variant="outline"
                  onClick={handlePercent}
                  className="hover:bg-gray-400"
                >
                  %
                </Button>
                <Button
                  variant="outline"
                  onClick={() => performOperation('/')}
                  className={
                    operation === '/'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-gray-400'
                  }
                >
                  ÷
                </Button>

                <Button
                  variant="outline"
                  onClick={() => inputDigit('7')}
                  className="hover:bg-gray-400"
                >
                  7
                </Button>
                <Button
                  variant="outline"
                  onClick={() => inputDigit('8')}
                  className="hover:bg-gray-400"
                >
                  8
                </Button>
                <Button
                  variant="outline"
                  onClick={() => inputDigit('9')}
                  className="hover:bg-gray-400"
                >
                  9
                </Button>
                <Button
                  variant="outline"
                  onClick={() => performOperation('*')}
                  className={
                    operation === '*'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-gray-400'
                  }
                >
                  ×
                </Button>

                <Button
                  variant="outline"
                  onClick={() => inputDigit('4')}
                  className="hover:bg-gray-400"
                >
                  4
                </Button>
                <Button
                  variant="outline"
                  onClick={() => inputDigit('5')}
                  className="hover:bg-gray-400"
                >
                  5
                </Button>
                <Button
                  variant="outline"
                  onClick={() => inputDigit('6')}
                  className="hover:bg-gray-400"
                >
                  6
                </Button>
                <Button
                  variant="outline"
                  onClick={() => performOperation('-')}
                  className={
                    operation === '-'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-gray-400'
                  }
                >
                  -
                </Button>

                <Button
                  variant="outline"
                  onClick={() => inputDigit('1')}
                  className="hover:bg-gray-400"
                >
                  1
                </Button>
                <Button
                  variant="outline"
                  onClick={() => inputDigit('2')}
                  className="hover:bg-gray-400"
                >
                  2
                </Button>
                <Button
                  variant="outline"
                  onClick={() => inputDigit('3')}
                  className="hover:bg-gray-400"
                >
                  3
                </Button>
                <Button
                  variant="outline"
                  onClick={() => performOperation('+')}
                  className={
                    operation === '+'
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-gray-400'
                  }
                >
                  +
                </Button>

                <Button
                  variant="outline"
                  onClick={handlePlusMinus}
                  className="hover:bg-gray-400"
                >
                  ±
                </Button>
                <Button
                  variant="outline"
                  onClick={() => inputDigit('0')}
                  className="hover:bg-gray-400"
                >
                  0
                </Button>
                <Button
                  variant="outline"
                  onClick={inputDecimal}
                  className="hover:bg-gray-400"
                >
                  .
                </Button>
                <Button
                  variant="outline"
                  onClick={handleEquals}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 bg-zinc-800 text-white hover:bg-zinc-900"
                >
                  =
                </Button>
              </div>
            </div>

            {/* Historique */}
            {showHistory && (
              <div className="w-full md:w-64 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-4 mt-4 md:mt-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">History</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearHistory}
                    className="h-6 text-xs"
                  >
                    Clear
                  </Button>
                </div>
                <div className="h-[300px] overflow-y-auto pr-2">
                  {history.length === 0 ? (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      No history yet
                    </p>
                  ) : (
                    <ul className="space-y-2">
                      {history.map((entry, index) => (
                        <li
                          key={index}
                          className="text-sm p-1 hover:bg-muted rounded cursor-pointer border"
                          onClick={() => handleHistoryItemClick(entry.result)}
                        >
                          <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground">
                              {entry.timestamp instanceof Date
                                ? entry.timestamp.toLocaleTimeString([], {
                                    hour: '2-digit',
                                    minute: '2-digit',
                                  })
                                : 'Invalid Timestamp'}
                            </span>
                            <span className="font-medium">
                              {entry.calculation}
                            </span>
                            <span className="text-lg">{entry.result}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
