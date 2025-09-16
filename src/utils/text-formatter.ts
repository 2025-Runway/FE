/**
 * 텍스트에서 <br> 태그를 만날 때마다 들여쓰기를 추가하는 함수
 * @param text 원본 텍스트
 * @param indent 들여쓰기 문자 (기본값: "  ")
 * @returns 들여쓰기가 적용된 텍스트 배열
 */
export function formatDescriptionWithIndent(
  text: string,
  indent = '  ',
): string[] {
  if (!text) return [];
  return text
    .split('<br>')
    .map((line, index) => {
      // 첫 번째 줄은 들여쓰기 없이
      if (index === 0) {
        return line.trim();
      }
      // 나머지 줄들은 들여쓰기 추가
      return `${indent}${line.trim()}`;
    })
    .filter(line => line.length > 0); // 빈 줄 제거
}
