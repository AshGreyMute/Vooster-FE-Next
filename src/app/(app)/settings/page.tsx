import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-3xl font-bold tracking-tight">설정</h2>
        <p className="text-muted-foreground">
          계정 및 애플리케이션 설정을 관리합니다.
        </p>
      </div>
      <Card className="mt-6 rounded-2xl">
        <CardHeader>
          <CardTitle>공사중</CardTitle>
          <CardDescription>
            이 페이지는 아직 구현되지 않았습니다.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>나중에 다시 방문하여 더 많은 설정을 확인하세요!</p>
        </CardContent>
      </Card>
    </div>
  )
}
